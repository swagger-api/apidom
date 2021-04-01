import stampit from 'stampit';
import { createNamespace, visit } from 'apidom';
import asyncApi2_0Namespace, {
  getNodeType,
  isAsyncApi2_0Element,
  keyMap,
} from 'apidom-ns-asyncapi-2-0';

import ResolveStrategy from '../ResolveStrategy';
import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  ResolveStrategy as IResolveStrategy,
} from '../../../types';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import AsyncApi2_0ResolveVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const AsyncApi2_0ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  methods: {
    canResolve(file: IFile) {
      // assert by media type
      if (file.mediaType !== 'text/plain') {
        return [
          'application/vnd.aai.asyncapi;version=2.0.0',
          'application/vnd.aai.asyncapi+json;version=2.0.0',
          'application/vnd.aai.asyncapi+yaml;version=2.0.0',
        ].includes(file.mediaType);
      }

      // assert by inspecting ApiDOM
      return isAsyncApi2_0Element(file.parseResult?.api);
    },

    async resolve(file: IFile, options: IReferenceOptions) {
      const namespace = createNamespace(asyncApi2_0Namespace);
      const reference = Reference({ uri: file.uri, value: file.parseResult });
      const visitor = AsyncApi2_0ResolveVisitor({ reference, namespace, options });
      const refSet = ReferenceSet();
      refSet.add(reference);

      await visitAsync(refSet.rootRef.value, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });
      await visitor.crawl();

      return refSet;
    },
  },
});

export default AsyncApi2_0ResolveStrategy;
