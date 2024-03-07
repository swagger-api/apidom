import stampit from 'stampit';
import { createNamespace, visit } from '@swagger-api/apidom-core';
import openapi2Namespace, {
  getNodeType,
  isSwaggerElement,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-openapi-2';

import ResolveStrategy from '../ResolveStrategy';
import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  ResolveStrategy as IResolveStrategy,
} from '../../../types';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import OpenApi2ResolveVisitor from './visitor';
import { merge as mergeOptions } from '../../../options/util';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const OpenApi2ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  init() {
    this.name = 'openapi-2';
  },
  methods: {
    canResolve(file: IFile) {
      // assert by media type
      if (file.mediaType !== 'text/plain') {
        return mediaTypes.includes(file.mediaType);
      }

      // assert by inspecting ApiDOM
      return isSwaggerElement(file.parseResult?.api);
    },

    async resolve(file: IFile, options: IReferenceOptions) {
      const namespace = createNamespace(openapi2Namespace);
      const reference = Reference({ uri: file.uri, value: file.parseResult });
      const mergedOptions = mergeOptions(options, { resolve: { internal: false } });
      const visitor = OpenApi2ResolveVisitor({ reference, namespace, options: mergedOptions });
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

export default OpenApi2ResolveStrategy;
