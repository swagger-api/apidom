import stampit from 'stampit';
import { createNamespace, visit } from '@swagger-api/apidom-core';
import openapi3_0Namespace, {
  getNodeType,
  isOpenApi3_0Element,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ResolveStrategy from '../ResolveStrategy';
import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  ResolveStrategy as IResolveStrategy,
} from '../../../types';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import { merge as mergeOptions } from '../../../options/util';
import OpenApi3_0ResolveVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  init() {
    this.name = 'openapi-3-0';
  },
  methods: {
    canResolve(file: IFile) {
      // assert by media type
      if (file.mediaType !== 'text/plain') {
        return mediaTypes.includes(file.mediaType);
      }

      // assert by inspecting ApiDOM
      return isOpenApi3_0Element(file.parseResult?.api);
    },

    async resolve(file: IFile, options: IReferenceOptions) {
      const namespace = createNamespace(openapi3_0Namespace);
      const reference = Reference({ uri: file.uri, value: file.parseResult });
      const mergedOptions = mergeOptions(options, { resolve: { internal: false } });
      const visitor = OpenApi3_0ResolveVisitor({ reference, namespace, options: mergedOptions });
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

export default OpenApi3_0ResolveStrategy;
