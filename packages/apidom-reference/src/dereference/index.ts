import { isEmpty, propEq } from 'ramda';
import {
  Element,
  isParseResultElement,
  ParseResultElement,
  cloneShallow,
} from '@swagger-api/apidom-core';

import File from '../File.ts';
import * as plugins from '../util/plugins.ts';
import UnmatchedDereferenceStrategyError from '../errors/UnmatchedDereferenceStrategyError.ts';
import DereferenceError from '../errors/DereferenceError.ts';
import parse from '../parse/index.ts';
import { merge as mergeOptions } from '../options/util.ts';
import * as url from '../util/url.ts';
import type { ReferenceOptions } from '../options/index.ts';

/**
 * Dereferences ApiDOM with all its external references.
 */
export const dereferenceApiDOM = async <T extends Element>(
  element: T,
  options: ReferenceOptions,
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

  const file = new File({
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
const dereference = async (uri: string, options: ReferenceOptions): Promise<ParseResultElement> => {
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

  const mergedOptions = mergeOptions(options, {
    resolve: { baseURI: sanitizedURI },
    dereference: {
      // if refSet was not provided, then we can work in mutable mode
      immutable: options.dereference.immutable && refSet !== null,
    },
  });

  return dereferenceApiDOM(parseResult, mergedOptions);
};

export default dereference;
