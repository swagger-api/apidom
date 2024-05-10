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

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(ResolveStrategy, {
  init() {
    this.name = 'openapi-3-0';
  },
  methods: {
    canResolve(file: File, options: IReferenceOptions): boolean {
      const dereferenceStrategy = options.dereference.strategies.find(
        (strategy: any) => strategy.name === 'openapi-3-0',
      );

      if (dereferenceStrategy === undefined) {
        return false;
      }

      return dereferenceStrategy.canDereference(file, options);
    },

    async resolve(file: File, options: IReferenceOptions) {
      const dereferenceStrategy = options.dereference.strategies.find(
        (strategy: any) => strategy.name === 'openapi-3-0',
      );

      if (dereferenceStrategy === undefined) {
        throw new UnmatchedDereferenceStrategyError(
          '"openapi-3-0" dereference strategy is not available.',
        );
      }

      const refSet = ReferenceSet();
      const mergedOptions = mergeOptions(options, {
        resolve: { internal: false },
        dereference: { refSet },
      });

      await dereferenceStrategy.dereference(file, mergedOptions);

      return refSet;
    },
  },
});

export default OpenApi3_0ResolveStrategy;
