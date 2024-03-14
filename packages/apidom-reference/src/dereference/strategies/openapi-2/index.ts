import stampit from 'stampit';
import { createNamespace, visit, Element, cloneDeep } from '@swagger-api/apidom-core';
import openApi2Namespace, {
  getNodeType,
  isSwaggerElement,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-openapi-2';

import DereferenceStrategy from '../DereferenceStrategy';
import {
  DereferenceStrategy as IDereferenceStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import OpenApi2DereferenceVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const OpenApi2DereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit(
  DereferenceStrategy,
  {
    init() {
      this.name = 'openapi-2';
    },
    methods: {
      canDereference(file: IFile): boolean {
        // assert by media type
        if (file.mediaType !== 'text/plain') {
          return mediaTypes.includes(file.mediaType);
        }

        // assert by inspecting ApiDOM
        return isSwaggerElement(file.parseResult?.api);
      },

      async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
        const namespace = createNamespace(openApi2Namespace);
        const refSet = options.dereference.refSet ?? ReferenceSet();
        let reference;

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

        const visitor = OpenApi2DereferenceVisitor({ reference, namespace, options });
        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

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

export default OpenApi2DereferenceStrategy;
