import stampit from 'stampit';
import { defaultTo, propEq } from 'ramda';
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
        let refSet = defaultTo(ReferenceSet(), options.dereference.refSet);
        let reference;

        // determine the initial reference
        if (!refSet.has(file.uri)) {
          reference = Reference({ uri: file.uri, value: file.parseResult });
          refSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = refSet.find(propEq(file.uri, 'uri'));
        }

        // clone reference set due the dereferencing process being mutable
        if (
          typeof options.dereference.dereferenceOpts.apidom?.clone === 'undefined' ||
          options.dereference.dereferenceOpts.apidom?.clone
        ) {
          const refsCopy = [...refSet.refs].map((ref) => {
            return Reference({ ...ref, value: cloneDeep(ref.value) });
          });
          refSet = ReferenceSet({ refs: refsCopy });
          reference = refSet.find(propEq(file.uri, 'uri'));
        }

        const visitor = ApiDOMDereferenceVisitor({ reference, options });
        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor);

        /**
         * Release all memory if this refSet was not provided as an configuration option.
         * If provided as configuration option, then provider is responsible for cleanup.
         */
        if (options.dereference.refSet === null) {
          refSet.clean();
        }

        return dereferencedElement;
      },
    },
  },
);

export default ApiDOMDereferenceStrategy;
