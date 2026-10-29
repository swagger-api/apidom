import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  mediaTypes,
  isJSONSchemaElement,
  isBooleanJsonSchemaElement,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

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
export interface JSONSchema2020_12BundleStrategyOptions
  extends Omit<BundleStrategyOptions, 'name'> {}

/**
 * Bundle strategy for JSON Schema 2020-12 documents.
 *
 * Like the OpenAPI 3.1 bundle strategy, it returns the parse result unchanged: external
 * schema resources are not embedded into a Compound Schema Document yet.
 *
 * @public
 */
class JSONSchema2020_12BundleStrategy extends BundleStrategy {
  constructor(options?: JSONSchema2020_12BundleStrategyOptions) {
    super({ ...(options ?? {}), name: 'json-schema-2020-12' });
  }

  canBundle(file: File): boolean {
    // assert by media type
    if (file.mediaType !== 'text/plain') {
      return mediaTypes.includes(file.mediaType);
    }

    // assert by inspecting ApiDOM
    const result = file.parseResult?.result;
    return (
      (isJSONSchemaElement(result) && result.element === 'JSONSchema202012') ||
      isBooleanJsonSchemaElement(result)
    );
  }

  async bundle(file: File): Promise<ParseResultElement> {
    return file.parseResult!;
  }
}

export default JSONSchema2020_12BundleStrategy;
