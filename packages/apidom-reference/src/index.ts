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

export { default as Parser } from './parse/parsers/Parser';
export { default as ApiDesignSystemsJsonParser } from './parse/parsers/apidom-reference-parser-api-design-systems-json';
export { default as ApiDesignSystemsYamlParser } from './parse/parsers/apidom-reference-parser-api-design-systems-yaml';
export { default as OpenApiJson3_0Parser } from './parse/parsers/apidom-reference-parser-openapi-json-3-0';
export { default as OpenApiYaml3_0Parser } from './parse/parsers/apidom-reference-parser-openapi-yaml-3-0';
export { default as OpenApiJson3_1Parser } from './parse/parsers/apidom-reference-parser-openapi-json-3-1';
export { default as OpenApiYaml3_1Parser } from './parse/parsers/apidom-reference-parser-openapi-yaml-3-1';
export { default as AsyncApiJson2Parser } from './parse/parsers/apidom-reference-parser-asyncapi-json-2';
export { default as AsyncApiYaml2Parser } from './parse/parsers/apidom-reference-parser-asyncapi-yaml-2';
export { default as JsonParser } from './parse/parsers/apidom-reference-parser-json';
export { default as YamlParser } from './parse/parsers/apidom-reference-parser-yaml-1-2';
export { default as BinaryParser } from './parse/parsers/apidom-reference-parser-binary/index-node';

export { default as FileResolver } from './resolve/resolvers/FileResolver/index-node';
export { default as HttpResolverAxios } from './resolve/resolvers/HttpResolverAxios';
export { default as HttpResolverSwaggerClient } from './resolve/resolvers/HttpResolverSwaggerClient';
export { default as HttpResolver } from './resolve/resolvers/HttpResolver';
export { default as Resolver } from './resolve/resolvers/Resolver';
export { default as ResolveStrategy } from './resolve/strategies/ResolveStrategy';
export { default as AsyncApi2ResolveStrategy } from './resolve/strategies/asyncapi-2';
export { default as OpenApi3_0ResolveStrategy } from './resolve/strategies/openapi-3-0';
export { default as OpenApi3_1ResolveStrategy } from './resolve/strategies/openapi-3-1';

export { default as AsyncApi2DereferenceStrategy } from './dereference/strategies/asyncapi-2';
export { default as OpenApi3_0DereferenceStrategy } from './dereference/strategies/openapi-3-0';
export { default as OpenApi3_1DereferenceStrategy } from './dereference/strategies/openapi-3-1';

export { default as options } from './options';
export { merge as mergeOptions } from './options/util';

export { default as Reference } from './Reference';
export { default as ReferenceSet } from './ReferenceSet';

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
