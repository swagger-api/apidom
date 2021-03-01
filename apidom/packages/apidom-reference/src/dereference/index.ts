import { isEmpty } from 'ramda';
import { Element, ParseResultElement } from 'apidom';

import File from '../util/File';
import * as plugins from '../util/plugins';
import { UnmatchedResolveStrategyError } from '../util/errors';
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
  const file = File({
    uri: options.resolve.baseURI,
    parseResult: element,
    mediaType: options.parse.mediaType,
  });

  const dereferenceStrategies = plugins.filter(
    'canDereference',
    file,
    options.dereference.strategies,
  );

  // we couldn't find any dereference for this File
  if (isEmpty(dereferenceStrategies)) {
    throw new UnmatchedResolveStrategyError(file.uri);
  }

  try {
    const { result } = await plugins.run('dereference', [file, options], dereferenceStrategies);
    return result;
  } catch (error) {
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
  const parseResult = await parse(uri, options);
  const mergedOptions = mergeOptions(options, { resolve: { baseURI: uri } });

  return dereferenceApiDOM(parseResult, mergedOptions);
};

export default dereference;
