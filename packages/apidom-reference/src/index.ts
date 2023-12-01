import { ParseResultElement, Element } from '@swagger-api/apidom-core';

import File from './util/File';
import * as url from './util/url';
import { ReferenceSet as IReferenceSet } from './types';
import defaultOptions from './options';
import { merge as mergeOptions } from './options/util';
import parseFn from './parse';
import resolveFn, { resolveApiDOM as resolveApiDOMFn } from './resolve';
import { readFile as readFileFn } from './resolve/util';
import dereferenceFn, { dereferenceApiDOM as dereferenceApiDOMFn } from './dereference';
import bundleFn from './bundle';

export { url, File };

export { default as Parser } from './parse/parsers/Parser';

export { default as Resolver } from './resolve/resolvers/Resolver';
export { default as HttpResolver } from './resolve/resolvers/HttpResolver';
export { default as ResolveStrategy } from './resolve/strategies/ResolveStrategy';

export { default as DereferenceStrategy } from './dereference/strategies/DereferenceStrategy';
export { AncestorLineage as DereferenceAncestorLineage } from './dereference/util';

export { default as options } from './options';
export { merge as mergeOptions } from './options/util';

export { default as Reference } from './Reference';
export { default as ReferenceSet } from './ReferenceSet';

export { default as BundleError } from './errors/BundleError';
export { default as MaximumBundleDepthError } from './errors/MaximumBundleDepthError';
export { default as UnmatchedBundleStrategyError } from './errors/UnmatchedBundleStrategyError';
export { default as DereferenceError } from './errors/DereferenceError';
export { default as EvaluationJsonSchema$anchorError } from './errors/EvaluationJsonSchema$anchorError';
export { default as EvaluationJsonSchemaUriError } from './errors/EvaluationJsonSchemaUriError';
export { default as InvalidJsonSchema$anchorError } from './errors/InvalidJsonSchema$anchorError';
export { default as JsonSchema$anchorError } from './errors/JsonSchema$anchorError';
export { default as JsonSchemaURIError } from './errors/JsonSchemaUriError';
export { default as MaximumDereferenceDepthError } from './errors/MaximumDereferenceDepthError';
export { default as MaximumResolveDepthError } from './errors/MaximumResolveDepthError';
export { default as ParseError } from './errors/ParseError';
export { default as ParserError } from './errors/ParserError';
export { default as PluginError } from './errors/PluginError';
export { default as ResolveError } from './errors/ResolveError';
export { default as ResolverError } from './errors/ResolverError';
export { default as UnmatchedDereferenceStrategyError } from './errors/UnmatchedDereferenceStrategyError';
export { default as UnmatchedResolveStrategyError } from './errors/UnmatchedResolveStrategyError';
export { default as UnmatchedResolverError } from './errors/UnmatchedResolverError';

export const readFile = async (uri: string, options = {}): Promise<Buffer> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  const file = File({ uri: url.sanitize(uri) });

  return readFileFn(file, mergedOptions);
};

export const parse = async (uri: string, options = {}): Promise<ParseResultElement> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return parseFn(uri, mergedOptions);
};

export const resolve = async (uri: string, options = {}): Promise<IReferenceSet> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return resolveFn(uri, mergedOptions);
};

export const resolveApiDOM = async <T extends Element>(
  element: T,
  options = {},
): Promise<IReferenceSet> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return resolveApiDOMFn(element, mergedOptions);
};

export const dereference = async (uri: string, options = {}): Promise<ParseResultElement> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return dereferenceFn(uri, mergedOptions);
};

export const dereferenceApiDOM = async <T extends Element>(
  element: T,
  options = {},
): Promise<T> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return dereferenceApiDOMFn(element, mergedOptions);
};

export const bundle = async (uri: string, options = {}): Promise<ParseResultElement> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return bundleFn(uri, mergedOptions);
};
