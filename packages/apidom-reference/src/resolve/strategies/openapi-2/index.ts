import ResolveStrategy, { ResolveStrategyOptions } from '../ResolveStrategy.ts';
import ReferenceSet from '../../../ReferenceSet.ts';
import File from '../../../File.ts';
import { merge as mergeOptions } from '../../../options/util.ts';
import UnmatchedDereferenceStrategyError from '../../../errors/UnmatchedDereferenceStrategyError.ts';
import type { ReferenceOptions } from '../../../options/index.ts';

export type { default as ResolveStrategy, ResolveStrategyOptions } from '../ResolveStrategy.ts';
export type { default as ReferenceSet, ReferenceSetOptions } from '../../../ReferenceSet.ts';
export type { default as File, FileOptions } from '../../../File.ts';
export type {
  ReferenceOptions as ApiDOMReferenceOptions,
  ReferenceBundleOptions as ApiDOMReferenceBundleOptions,
  ReferenceDereferenceOptions as ApiDOMReferenceDereferenceOptions,
  ReferenceParseOptions as ApiDOMReferenceParseOptions,
  ReferenceResolveOptions as ApiDOMReferenceResolveOptions,
} from '../../../options/index.ts';
export type { default as Parser, ParserOptions } from '../../../parse/parsers/Parser.ts';
export type { default as Resolver, ResolverOptions } from '../../resolvers/Resolver.ts';
export type {
  default as DereferenceStrategy,
  DereferenceStrategyOptions,
} from '../../../dereference/strategies/DereferenceStrategy.ts';
export type {
  default as BundleStrategy,
  BundleStrategyOptions,
} from '../../../bundle/strategies/BundleStrategy.ts';
export type { default as Reference, ReferenceOptions } from '../../../Reference.ts';

/**
 * @public
 */
export interface OpenAPI2ResolveStrategyOptions extends Omit<ResolveStrategyOptions, 'name'> {}

/**
 * @public
 */
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
