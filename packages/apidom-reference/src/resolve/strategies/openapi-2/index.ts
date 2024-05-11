import stampit from 'stampit';

import ResolveStrategy from '../ResolveStrategy';
import {
  ReferenceOptions as IReferenceOptions,
  ResolveStrategy as IResolveStrategy,
} from '../../../types';
import ReferenceSet from '../../../ReferenceSet';
import File from '../../../File';
import { merge as mergeOptions } from '../../../options/util';
import UnmatchedDereferenceStrategyError from '../../../errors/UnmatchedDereferenceStrategyError';

const OpenApi2ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  init() {
    this.name = 'openapi-2';
  },
  methods: {
    canResolve(file: File, options: IReferenceOptions) {
      const dereferenceStrategy = options.dereference.strategies.find(
        (strategy: any) => strategy.name === 'openapi-2',
      );

      if (dereferenceStrategy === undefined) {
        return false;
      }

      return dereferenceStrategy.canDereference(file, options);
    },

    async resolve(file: File, options: IReferenceOptions) {
      const dereferenceStrategy = options.dereference.strategies.find(
        (strategy: any) => strategy.name === 'openapi-2',
      );

      if (dereferenceStrategy === undefined) {
        throw new UnmatchedDereferenceStrategyError(
          '"openapi-2" dereference strategy is not available.',
        );
      }

      const refSet = new ReferenceSet();
      const mergedOptions = mergeOptions(options, {
        resolve: { internal: false },
        dereference: { refSet },
      });

      await dereferenceStrategy.dereference(file, mergedOptions);

      return refSet;
    },
  },
});

export default OpenApi2ResolveStrategy;
