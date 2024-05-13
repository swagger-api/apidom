import { isEmpty } from 'ramda';
import {
  Element,
  isParseResultElement,
  ParseResultElement,
  cloneShallow,
} from '@swagger-api/apidom-core';

import { merge as mergeOptions } from '../options/util';
import parse from '../parse';
import * as plugins from '../util/plugins';
import File from '../File';
import ReferenceSet from '../ReferenceSet';
import ResolveError from '../errors/ResolverError';
import UnmatchedResolveStrategyError from '../errors/UnmatchedResolveStrategyError';
import * as url from '../util/url';
import type { ReferenceOptions } from '../options';

/**
 * Resolves ApiDOM with all its external references.
 */
export const resolveApiDOM = async <T extends Element>(
  element: T,
  options: ReferenceOptions,
): Promise<ReferenceSet> => {
  // @ts-ignore
  let parseResult: ParseResultElement = element;

  // wrap element into parse result
  if (!isParseResultElement(element)) {
    // shallow clone of the element
    const elementClone = cloneShallow(element);
    elementClone.classes.push('result');
    parseResult = new ParseResultElement([elementClone]);
  }

  const sanitizedURI = url.sanitize(url.stripHash(options.resolve.baseURI));
  const file = new File({
    uri: sanitizedURI,
    parseResult,
    mediaType: options.parse.mediaType,
  });

  const resolveStrategies = await plugins.filter(
    'canResolve',
    [file, options],
    options.resolve.strategies,
  );

  // we couldn't find any resolver for this File
  if (isEmpty(resolveStrategies)) {
    throw new UnmatchedResolveStrategyError(file.uri);
  }

  try {
    const { result } = await plugins.run('resolve', [file, options], resolveStrategies);
    return result;
  } catch (error: any) {
    throw new ResolveError(`Error while resolving file "${file.uri}"`, { cause: error });
  }
};

/**
 * Resolves a file with all its external references.
 */
const resolve = async (uri: string, options: ReferenceOptions): Promise<ReferenceSet> => {
  const parseResult = await parse(uri, options);
  const mergedOptions = mergeOptions(options, { resolve: { baseURI: url.sanitize(uri) } });

  return resolveApiDOM(parseResult, mergedOptions);
};

export default resolve;
