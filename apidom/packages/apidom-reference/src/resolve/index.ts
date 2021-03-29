import { isEmpty } from 'ramda';
import { Element } from 'apidom';

import { merge as mergeOptions } from '../options/util';
import { ReferenceOptions as IReferenceOptions, ReferenceSet as IReferenceSet } from '../types';
import parse from '../parse';
import * as plugins from '../util/plugins';
import File from '../util/File';
import { ResolverError, UnmatchedResolveStrategyError } from '../util/errors';

/**
 * Resolves ApiDOM with all it's external references.
 */
export const resolveApiDOM = async <T extends Element>(
  element: T,
  options: IReferenceOptions,
): Promise<IReferenceSet> => {
  const file = File({
    uri: options.resolve.baseURI,
    parseResult: element,
    mediaType: options.parse.mediaType,
  });

  const resolveStrategies = plugins.filter('canResolve', file, options.resolve.strategies);

  // we couldn't find any resolver for this File
  if (isEmpty(resolveStrategies)) {
    throw new UnmatchedResolveStrategyError(file.uri);
  }

  try {
    const { result } = await plugins.run('resolve', [file, options], resolveStrategies);
    return result;
  } catch (error) {
    throw new ResolverError(`Error while resolving file "${file.uri}"`, error);
  }
};

/**
 * Resolves a file with all it's external references.
 */
const resolve = async (uri: string, options: IReferenceOptions): Promise<IReferenceSet> => {
  const parseResult = await parse(uri, options);
  const mergedOptions = mergeOptions(options, { resolve: { baseURI: uri } });

  return resolveApiDOM(parseResult, mergedOptions);
};

export default resolve;
