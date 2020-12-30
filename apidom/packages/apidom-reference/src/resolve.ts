import { isEmpty } from 'ramda';

import { ReferenceOptions as IReferenceOptions, ReferenceSet as IReferenceSet } from './types';
import parse from './parse';
import * as plugins from './util/plugins';
import File from './util/File';
import { ResolverError, UnmatchedResolveStrategyError } from './util/errors';

/**
 * Resolves a file with all it's external references.
 */
const resolve = async (uri: string, options: IReferenceOptions): Promise<IReferenceSet> => {
  const parseResult = await parse(uri, options);
  const file = File({ uri, parseResult, mediaType: options.parse.mediaType });
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

export default resolve;
