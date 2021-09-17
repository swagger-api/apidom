import { isEmpty, propEq } from 'ramda';
import { Element, isParseResultElement, ParseResultElement } from 'apidom';

import File from '../util/File';
import * as plugins from '../util/plugins';
import { UnmatchedDereferenceStrategyError } from '../util/errors';
import DereferenceError from '../util/errors/DereferenceError';
import { ReferenceOptions as IReferenceOptions } from '../types';
import parse from '../parse';
import { merge as mergeOptions } from '../options/util';

/**
 * Dereferences ApiDOM with all it's external references.
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
    // shallow clone of the element
    // @ts-ignore
    const elementClone = new element.constructor(
      element.content,
      element.meta.clone(),
      element.attributes,
    );
    elementClone.classes.push('result');
    parseResult = new ParseResultElement([elementClone]);
    surrogateWrapping = true;
  }

  const file = File({
    uri: options.resolve.baseURI,
    parseResult,
    mediaType: options.parse.mediaType,
  });

  const dereferenceStrategies = plugins.filter(
    'canDereference',
    file,
    options.dereference.strategies,
  );

  // we couldn't find any dereference for this File
  if (isEmpty(dereferenceStrategies)) {
    throw new UnmatchedDereferenceStrategyError(file.uri);
  }

  try {
    const { result } = await plugins.run('dereference', [file, options], dereferenceStrategies);
    // unwrap the element from ParseResult assuming first element is the actual result
    return surrogateWrapping ? result.get(0) : result;
  } catch (error: any) {
    throw new DereferenceError(`Error while dereferencing file "${file.uri}"`, error);
  }
};

/**
 * Dereferences a file with all it's external references.
 */
const dereference = async (
  uri: string,
  options: IReferenceOptions,
): Promise<ParseResultElement> => {
  const { refSet } = options.dereference;
  let parseResult;

  // if refSet was provided, use it to avoid unnecessary parsing
  if (refSet !== null && refSet.has(uri)) {
    // @ts-ignore
    ({ value: parseResult } = refSet.find(propEq('uri', uri)));
  } else {
    parseResult = await parse(uri, options);
  }

  const mergedOptions = mergeOptions(options, { resolve: { baseURI: uri } });

  return dereferenceApiDOM(parseResult, mergedOptions);
};

export default dereference;
