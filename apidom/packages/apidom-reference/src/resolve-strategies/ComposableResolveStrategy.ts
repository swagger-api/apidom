import stampit from 'stampit';
import { and } from 'ramda';

import {
  ComposableResolveStrategy as IComposableResolveStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  ReferenceSet as IReferenceSet,
  ResolveStrategy as IResolveStrategy,
} from '../types';
import ResolveStrategy from './ResolveStrategy';
import ReferenceSet from '../ReferenceSet';

const ComposableResolveStrategy: stampit.Stamp<IComposableResolveStrategy> = stampit(
  ResolveStrategy,
  {
    props: {
      composeStrategies: [],
    },
    methods: {
      canResolve(file: IFile) {
        return this.composeStrategies
          .map((strategy: IResolveStrategy) => strategy.canResolve(file))
          .reduce(and, true);
      },
      async resolve(file: IFile, options: IReferenceOptions) {
        const promises: Promise<IReferenceSet>[] = [];

        for (const strategy of this.composeStrategies) {
          promises.push(strategy.resolve(file, options));
        }

        const refSets = await Promise.all(promises);

        return refSets.reduce((acc, refSet) => acc.merge(refSet), ReferenceSet());
      },
    },
  },
);

export default ComposableResolveStrategy;
