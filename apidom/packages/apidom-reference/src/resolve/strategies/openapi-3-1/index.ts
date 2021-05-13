import stampit from 'stampit';
import { createNamespace, visit } from 'apidom';
import openApi3_1Namespace, {
  getNodeType,
  isOpenApi3_1Element,
  keyMap,
} from 'apidom-ns-openapi-3-1';

import ResolveStrategy from '../ResolveStrategy';
import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  ResolveStrategy as IResolveStrategy,
} from '../../../types';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import OpenApi3_1ResolveVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const OpenApi3_1ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  init() {
    this.name = 'openapi-3-1';
  },
  methods: {
    canResolve(file: IFile) {
      // assert by media type
      if (file.mediaType !== 'text/plain') {
        return [
          'application/vnd.oai.openapi;version=3.1.0',
          'application/vnd.oai.openapi+json;version=3.1.0',
          'application/vnd.oai.openapi+yaml;version=3.1.0',
        ].includes(file.mediaType);
      }

      // assert by inspecting ApiDOM
      return isOpenApi3_1Element(file.parseResult?.api);
    },

    async resolve(file: IFile, options: IReferenceOptions) {
      const namespace = createNamespace(openApi3_1Namespace);
      const reference = Reference({ uri: file.uri, value: file.parseResult });
      const visitor = OpenApi3_1ResolveVisitor({ reference, namespace, options });
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

export default OpenApi3_1ResolveStrategy;
