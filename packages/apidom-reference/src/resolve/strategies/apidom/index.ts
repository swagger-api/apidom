import stampit from 'stampit';
import { isElement, visit } from '@swagger-api/apidom-core';

import ResolveStrategy from '../ResolveStrategy';
import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  ResolveStrategy as IResolveStrategy,
} from '../../../types';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import ApiDOMResolveVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const ApiDOMResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  init() {
    this.name = 'apidom';
  },
  methods: {
    canResolve(file: IFile) {
      return (
        file.mediaType.startsWith('application/vnd.apidom') && isElement(file.parseResult?.result)
      );
    },

    async resolve(file: IFile, options: IReferenceOptions) {
      const reference = Reference({ uri: file.uri, value: file.parseResult });
      const visitor = ApiDOMResolveVisitor({ reference, options });
      const refSet = ReferenceSet();
      refSet.add(reference);

      await visitAsync(refSet.rootRef.value, visitor);

      return refSet;
    },
  },
});

export default ApiDOMResolveStrategy;
