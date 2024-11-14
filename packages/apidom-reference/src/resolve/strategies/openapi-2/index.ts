import ResolveStrategy, { ResolveStrategyOptions } from '../ResolveStrategy.ts';
import ReferenceSet from '../../../ReferenceSet.ts';
import File from '../../../File.ts';
import { merge as mergeOptions } from '../../../options/util.ts';
import UnmatchedDereferenceStrategyError from '../../../errors/UnmatchedDereferenceStrategyError.ts';
import type { ReferenceOptions } from '../../../options/index.ts';

export interface OpenAPI2ResolveStrategyOptions extends Omit<ResolveStrategyOptions, 'name'> {}

class OpenAPI2ResolveStrategy extends ResolveStrategy {
  constructor(options?: OpenAPI2ResolveStrategyOptions) {
    super({ ...(options ?? {}), name: 'openapi-2' });
  }

  canResolve(file: File, options: ReferenceOptions) {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === 'openapi-2',
    );

    if (dereferenceStrategy === undefined) {
      return false;
    }

    return dereferenceStrategy.canDereference(file, options);
  }

  async resolve(file: File, options: ReferenceOptions) {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === 'openapi-2',
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
  }
}

export default OpenAPI2ResolveStrategy;
