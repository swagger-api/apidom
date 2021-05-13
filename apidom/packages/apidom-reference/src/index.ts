import { ParseResultElement, Element } from 'apidom';

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
export { default as OpenApiJson3_1Parser } from './parse/parsers/apidom-reference-parser-openapi-json-3-1';
export { default as OpenApiYaml3_1Parser } from './parse/parsers/apidom-reference-parser-openapi-yaml-3-1';
export { default as AsyncApiJson2_0Parser } from './parse/parsers/apidom-reference-parser-asyncapi-json-2-0';
export { default as AsyncApiYaml2_0Parser } from './parse/parsers/apidom-reference-parser-asyncapi-yaml-2-0';
export { default as JsonParser } from './parse/parsers/apidom-reference-parser-json';
export { default as YamlParser } from './parse/parsers/apidom-reference-parser-yaml-1-2';

export { default as FileResolver } from './resolve/resolvers/FileResolver';
export { default as HttpResolverAxios } from './resolve/resolvers/HttpResolverAxios';
export { default as HttpResolver } from './resolve/resolvers/HttpResolver';
export { default as Resolver } from './resolve/resolvers/Resolver';
export { default as ResolveStrategy } from './resolve/strategies/ResolveStrategy';
export { default as AsyncApi2_0ResolveStrategy } from './resolve/strategies/asyncapi-2-0';
export { default as OpenApi3_1ResolveStrategy } from './resolve/strategies/openapi-3-1';

export { default as options } from './options';
export { merge as mergeOptions } from './options/util';

export const readFile = async (uri: string, options = {}): Promise<Buffer> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  const sanitizedURI = url.isFileSystemPath(uri) ? url.fromFileSystemPath(uri) : uri;
  const file = File({ uri: sanitizedURI });

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
