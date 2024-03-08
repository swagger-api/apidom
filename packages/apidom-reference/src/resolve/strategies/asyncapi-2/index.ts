import stampit from 'stampit';
import { createNamespace, visit } from '@swagger-api/apidom-core';
import asyncApi2Namespace, {
  getNodeType,
  isAsyncApi2Element,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ResolveStrategy from '../ResolveStrategy';
import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  ResolveStrategy as IResolveStrategy,
} from '../../../types';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import AsyncApi2ResolveVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const AsyncApi2ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  init() {
    this.name = 'asyncapi-2';
  },
  methods: {
    canResolve(file: IFile) {
      // assert by media type
      if (file.mediaType !== 'text/plain') {
        return mediaTypes.includes(file.mediaType);
      }

      // assert by inspecting ApiDOM
      return isAsyncApi2Element(file.parseResult?.api);
    },

    async resolve(file: IFile, options: IReferenceOptions) {
      const namespace = createNamespace(asyncApi2Namespace);
      const reference = Reference({ uri: file.uri, value: file.parseResult });
      const visitor = AsyncApi2ResolveVisitor({ reference, namespace, options });
      const refSet = ReferenceSet();
      refSet.add(reference);

      await visitAsync(refSet.rootRef.value, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      return refSet;
    },
  },
});

export default AsyncApi2ResolveStrategy;
