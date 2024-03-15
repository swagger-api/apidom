import stampit from 'stampit';
import { createNamespace, visit, Element, cloneDeep } from '@swagger-api/apidom-core';
import asyncApi2Namespace, {
  getNodeType,
  isAsyncApi2Element,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-asyncapi-2';

import DereferenceStrategy from '../DereferenceStrategy';
import {
  DereferenceStrategy as IDereferenceStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import AsyncApi2DereferenceVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const AsyncApi2DereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit(
  DereferenceStrategy,
  {
    init() {
      this.name = 'asyncapi-2';
    },
    methods: {
      canDereference(file: IFile): boolean {
        // assert by media type
        if (file.mediaType !== 'text/plain') {
          return mediaTypes.includes(file.mediaType);
        }

        // assert by inspecting ApiDOM
        return isAsyncApi2Element(file.parseResult?.api);
      },

      async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
        const namespace = createNamespace(asyncApi2Namespace);
        const immutableRefSet = options.dereference.refSet ?? ReferenceSet();
        const mutableRefsSet = ReferenceSet();
        let refSet = immutableRefSet;
        let reference;

        if (!immutableRefSet.has(file.uri)) {
          reference = Reference({ uri: file.uri, value: file.parseResult });
          immutableRefSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = immutableRefSet.find((ref) => ref.uri === file.uri);
        }

        /**
         * Clone refSet due the dereferencing process being mutable.
         * We don't want to mutate the original refSet and the references.
         */
        if (options.dereference.immutable) {
          immutableRefSet.refs
            .map((ref) =>
              Reference({
                ...ref,
                value: cloneDeep(ref.value),
              }),
            )
            .forEach((ref) => mutableRefsSet.add(ref));
          reference = mutableRefsSet.find((ref) => ref.uri === file.uri);
          refSet = mutableRefsSet;
        }

        const visitor = AsyncApi2DereferenceVisitor({ reference, namespace, options });
        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        /**
         * If immutable option is set, replay refs from the refSet.
         */
        if (options.dereference.immutable) {
          mutableRefsSet.refs
            .filter((ref) => ref.uri.startsWith('immutable://'))
            .map((ref) =>
              Reference({
                ...ref,
                uri: ref.uri.replace(/^immutable:\/\//, ''),
              }),
            )
            .forEach((ref) => immutableRefSet.add(ref));
          reference = immutableRefSet.find((ref) => ref.uri === file.uri);
          refSet = immutableRefSet;
        }

        /**
         * Release all memory if this refSet was not provided as a configuration option.
         * If provided as configuration option, then provider is responsible for cleanup.
         */
        if (options.dereference.refSet === null) {
          immutableRefSet.clean();
        }

        return dereferencedElement;
      },
    },
  },
);

export default AsyncApi2DereferenceStrategy;
