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

export { url, File };

export { default as Parser } from './parse/parsers/Parser';

export { default as Resolver } from './resolve/resolvers/Resolver';
export { default as HttpResolver } from './resolve/resolvers/HttpResolver';
export { default as ResolveStrategy } from './resolve/strategies/ResolveStrategy';

export { default as DereferenceStrategy } from './dereference/strategies/DereferenceStrategy';

export { default as options } from './options';
export { merge as mergeOptions } from './options/util';

export { default as Reference } from './Reference';
export { default as ReferenceSet } from './ReferenceSet';

export {
  DereferenceError,
  InvalidSelectorError,
  MaximumDereferenceDepthError,
  MaximumResolverDepthError,
  NotImplementedError,
  ParserError,
  PluginError,
  ResolverError,
  UnmatchedDereferenceStrategyError,
  UnmatchedResolveStrategyError,
  UnmatchedResolverError,
} from './util/errors';

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
