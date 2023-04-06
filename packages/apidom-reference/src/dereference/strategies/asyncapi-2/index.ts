import stampit from 'stampit';
import { defaultTo, propEq } from 'ramda';
import { createNamespace, visit, Element } from '@swagger-api/apidom-core';
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
        const refSet = defaultTo(ReferenceSet(), options.dereference.refSet);
        let reference;

        if (!refSet.has(file.uri)) {
          reference = Reference({ uri: file.uri, value: file.parseResult });
          refSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = refSet.find(propEq(file.uri, 'uri'));
        }

        const visitor = AsyncApi2DereferenceVisitor({ reference, namespace, options });
        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

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

export default AsyncApi2DereferenceStrategy;
