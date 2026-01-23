import { ParseResultElement } from '@swagger-api/apidom-core';
import { mediaTypes, isOpenApi3_2Element } from '@swagger-api/apidom-ns-openapi-3-2';

import File from '../../../File.ts';
import BundleStrategy, { BundleStrategyOptions } from '../BundleStrategy.ts';

export type {
  default as DereferenceStrategy,
  DereferenceStrategyOptions,
} from '../../../dereference/strategies/DereferenceStrategy.ts';
export type { default as File, FileOptions } from '../../../File.ts';
export type { default as Reference, ReferenceOptions } from '../../../Reference.ts';
export type { default as ReferenceSet, ReferenceSetOptions } from '../../../ReferenceSet.ts';
export type {
  ReferenceOptions as ApiDOMReferenceOptions,
  ReferenceBundleOptions as ApiDOMReferenceBundleOptions,
  ReferenceDereferenceOptions as ApiDOMReferenceDereferenceOptions,
  ReferenceParseOptions as ApiDOMReferenceParseOptions,
  ReferenceResolveOptions as ApiDOMReferenceResolveOptions,
} from '../../../options/index.ts';
export type { default as Parser, ParserOptions } from '../../../parse/parsers/Parser.ts';
export type { default as Resolver, ResolverOptions } from '../../../resolve/resolvers/Resolver.ts';
export type {
  default as ResolveStrategy,
  ResolveStrategyOptions,
} from '../../../resolve/strategies/ResolveStrategy.ts';
export type { default as BundleStrategy, BundleStrategyOptions } from '../BundleStrategy.ts';

/**
 * @public
 */
export interface OpenAPI3_2BundleStrategyOptions extends Omit<BundleStrategyOptions, 'name'> {}

/**
 * @public
 */
class OpenAPI3_2BundleStrategy extends BundleStrategy {
  constructor(options?: OpenAPI3_2BundleStrategyOptions) {
    super({ ...(options ?? {}), name: 'openapi-3-2' });
  }

  canBundle(file: File): boolean {
    // assert by media type
    if (file.mediaType !== 'text/plain') {
      return mediaTypes.includes(file.mediaType);
    }

    // assert by inspecting ApiDOM
    return isOpenApi3_2Element(file.parseResult?.result);
  }

  async bundle(file: File): Promise<ParseResultElement> {
    return file.parseResult!;
  }
}

export default OpenAPI3_2BundleStrategy;
