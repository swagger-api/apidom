import ResolveStrategy, { ResolveStrategyOptions } from '../ResolveStrategy';
import ReferenceSet from '../../../ReferenceSet';
import File from '../../../File';
import { merge as mergeOptions } from '../../../options/util';
import UnmatchedDereferenceStrategyError from '../../../errors/UnmatchedDereferenceStrategyError';
import type { ReferenceOptions } from '../../../options';

export interface ApiDOMResolveStrategyOptions extends Omit<ResolveStrategyOptions, 'name'> {}

class ApiDOMResolveStrategy extends ResolveStrategy {
  constructor(options?: ApiDOMResolveStrategyOptions) {
    super({ ...(options ?? {}), name: 'apidom' });
  }

  canResolve(file: File, options: ReferenceOptions): boolean {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === 'apidom',
    );

    if (dereferenceStrategy === undefined) {
      return false;
    }

    return dereferenceStrategy.canDereference(file, options);
  }

  async resolve(file: File, options: ReferenceOptions) {
    const dereferenceStrategy = options.dereference.strategies.find(
      (strategy) => strategy.name === 'apidom',
    );

    if (dereferenceStrategy === undefined) {
      throw new UnmatchedDereferenceStrategyError(
        '"apidom" dereference strategy is not available.',
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

export default ApiDOMResolveStrategy;
