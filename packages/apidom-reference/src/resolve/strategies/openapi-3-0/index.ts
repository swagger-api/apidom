import ResolveStrategy, { ResolveStrategyOptions } from '../ResolveStrategy';
import ReferenceSet from '../../../ReferenceSet';
import File from '../../../File';
import { merge as mergeOptions } from '../../../options/util';
import UnmatchedDereferenceStrategyError from '../../../errors/UnmatchedDereferenceStrategyError';
import type { ReferenceOptions } from '../../../options';

export interface OpenAPI3_0ResolveStrategyOptions extends Omit<ResolveStrategyOptions, 'name'> {}

class OpenAPI3_0ResolveStrategy extends ResolveStrategy {
  constructor(options?: OpenAPI3_0ResolveStrategyOptions) {
    super({ ...(options ?? {}), name: 'openapi-3-0' });
  }

  canResolve(file: File, options: ReferenceOptions): boolean {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === 'openapi-3-0',
    );

    if (dereferenceStrategy === undefined) {
      return false;
    }

    return dereferenceStrategy.canDereference(file, options);
  }

  async resolve(file: File, options: ReferenceOptions) {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === 'openapi-3-0',
    );

    if (dereferenceStrategy === undefined) {
      throw new UnmatchedDereferenceStrategyError(
        '"openapi-3-0" dereference strategy is not available.',
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

export default OpenAPI3_0ResolveStrategy;
