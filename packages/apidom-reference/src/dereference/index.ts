import { isEmpty, propEq } from 'ramda';
import {
  Element,
  isParseResultElement,
  ParseResultElement,
  cloneShallow,
} from '@swagger-api/apidom-core';

import File from '../util/File';
import * as plugins from '../util/plugins';
import UnmatchedDereferenceStrategyError from '../errors/UnmatchedDereferenceStrategyError';
import DereferenceError from '../errors/DereferenceError';
import { ReferenceOptions as IReferenceOptions } from '../types';
import parse from '../parse';
import { merge as mergeOptions } from '../options/util';
import * as url from '../util/url';

/**
 * Dereferences ApiDOM with all its external references.
 */
export const dereferenceApiDOM = async <T extends Element>(
  element: T,
  options: IReferenceOptions,
): Promise<T> => {
  // @ts-ignore
  let parseResult: ParseResultElement = element;
  let surrogateWrapping = false;

  // wrap element into parse result
  if (!isParseResultElement(element)) {
    const elementClone = cloneShallow(element);
    elementClone.classes.push('result');
    parseResult = new ParseResultElement([elementClone]);
    surrogateWrapping = true;
  }

  const file = File({
    uri: options.resolve.baseURI,
    parseResult,
    mediaType: options.parse.mediaType,
  });

  const dereferenceStrategies = await plugins.filter(
    'canDereference',
    [file, options],
    options.dereference.strategies,
  );

  // we couldn't find any dereference strategy for this File
  if (isEmpty(dereferenceStrategies)) {
    throw new UnmatchedDereferenceStrategyError(file.uri);
  }

  try {
    const { result } = await plugins.run('dereference', [file, options], dereferenceStrategies);
    // unwrap the element from ParseResult assuming first element is the actual result
    return surrogateWrapping ? result.get(0) : result;
  } catch (error: any) {
    throw new DereferenceError(`Error while dereferencing file "${file.uri}"`, { cause: error });
  }
};

/**
 * Dereferences a file with all its external references.
 */
const dereference = async (
  uri: string,
  options: IReferenceOptions,
): Promise<ParseResultElement> => {
  const { refSet } = options.dereference;
  const sanitizedURI = url.sanitize(uri);
  let parseResult;

  // if refSet was provided, use it to avoid unnecessary parsing
  if (refSet !== null && refSet.has(sanitizedURI)) {
    // @ts-ignore
    ({ value: parseResult } = refSet.find(propEq(sanitizedURI, 'uri')));
  } else {
    parseResult = await parse(uri, options);
  }

  const mergedOptions = mergeOptions(options, { resolve: { baseURI: sanitizedURI } });

  return dereferenceApiDOM(parseResult, mergedOptions);
};

export default dereference;
