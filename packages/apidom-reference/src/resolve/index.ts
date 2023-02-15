import { isEmpty } from 'ramda';
import { Element, isParseResultElement, ParseResultElement } from '@swagger-api/apidom-core';

import { merge as mergeOptions } from '../options/util';
import { ReferenceOptions as IReferenceOptions, ReferenceSet as IReferenceSet } from '../types';
import parse from '../parse';
import * as plugins from '../util/plugins';
import File from '../util/File';
import { ResolverError, UnmatchedResolveStrategyError } from '../util/errors';
import * as url from '../util/url';

/**
 * Resolves ApiDOM with all its external references.
 */
export const resolveApiDOM = async <T extends Element>(
  element: T,
  options: IReferenceOptions,
): Promise<IReferenceSet> => {
  // @ts-ignore
  let parseResult: ParseResultElement = element;

  // wrap element into parse result
  if (!isParseResultElement(element)) {
    // shallow clone of the element
    // @ts-ignore
    const elementClone = new element.constructor(
      element.content,
      element.meta.clone(),
      element.attributes,
    );
    elementClone.classes.push('result');
    parseResult = new ParseResultElement([elementClone]);
  }

  const sanitizedURI = url.sanitize(url.stripHash(options.resolve.baseURI));
  const file = File({
    uri: sanitizedURI,
    parseResult,
    mediaType: options.parse.mediaType,
  });

  const resolveStrategies = await plugins.filter('canResolve', file, options.resolve.strategies);

  // we couldn't find any resolver for this File
  if (isEmpty(resolveStrategies)) {
    throw new UnmatchedResolveStrategyError(file.uri);
  }

  try {
    const { result } = await plugins.run('resolve', [file, options], resolveStrategies);
    return result;
  } catch (error: any) {
    throw new ResolverError(`Error while resolving file "${file.uri}"`, { cause: error });
  }
};

/**
 * Resolves a file with all its external references.
 */
const resolve = async (uri: string, options: IReferenceOptions): Promise<IReferenceSet> => {
  const parseResult = await parse(uri, options);
  const mergedOptions = mergeOptions(options, { resolve: { baseURI: uri } });

  return resolveApiDOM(parseResult, mergedOptions);
};

export default resolve;
