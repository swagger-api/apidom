import stampit from 'stampit';
import { Element, isElement, cloneDeep, visit } from '@swagger-api/apidom-core';

import DereferenceStrategy from '../DereferenceStrategy';
import {
  DereferenceStrategy as IDereferenceStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import ApiDOMDereferenceVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const ApiDOMDereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit(
  DereferenceStrategy,
  {
    init() {
      this.name = 'apidom';
    },
    methods: {
      canDereference(file: IFile) {
        return (
          file.mediaType.startsWith('application/vnd.apidom') && isElement(file.parseResult?.result)
        );
      },

      async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
        const refSet = options.dereference.refSet ?? ReferenceSet();
        let reference;

        // determine the initial reference
        if (!refSet.has(file.uri)) {
          reference = Reference({ uri: file.uri, value: file.parseResult });
          refSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = refSet.find((ref) => ref.uri === file.uri);
        }

        /**
         * Clone refSet due the dereferencing process being mutable.
         * We don't want to mutate the original refSet and the references.
         */
        if (options.dereference.immutable) {
          const immutableRefs = refSet.refs.map((ref) =>
            Reference({
              ...ref,
              uri: `immutable://${ref.uri}`,
            }),
          );
          const mutableRefs = refSet.refs.map((ref) =>
            Reference({
              ...ref,
              value: cloneDeep(ref.value),
            }),
          );

          refSet.clean();
          mutableRefs.forEach((ref) => refSet.add(ref));
          immutableRefs.forEach((ref) => refSet.add(ref));
          reference = refSet.find((ref) => ref.uri === file.uri);
        }

        const visitor = ApiDOMDereferenceVisitor({ reference, options });
        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor);

        if (options.dereference.refSet === null) {
          /**
           * Release all memory if this refSet was not provided as a configuration option.
           * If provided as configuration option, then provider is responsible for cleanup.
           */
          refSet.clean();
        } else if (options.dereference.immutable) {
          /**
           * If immutable option is set, then we need to remove mutable refs from the refSet.
           */
          const immutableRefs = refSet.refs
            .filter((ref) => ref.uri.startsWith('immutable://'))
            .map((ref) =>
              Reference({
                ...ref,
                uri: ref.uri.replace(/^immutable:\/\//, ''),
              }),
            );

          refSet.clean();
          immutableRefs.forEach((ref) => refSet.add(ref));
        }

        return dereferencedElement;
      },
    },
  },
);

export default ApiDOMDereferenceStrategy;
