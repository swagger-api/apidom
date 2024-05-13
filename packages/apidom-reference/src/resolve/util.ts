import { isEmpty } from 'ramda';

import File from '../File';
import Resolver from './resolvers/Resolver';
import * as plugins from '../util/plugins';
import ResolveError from '../errors/ResolveError';
import UnmatchedResolverError from '../errors/UnmatchedResolverError';
import type { ReferenceOptions } from '../options';

/**
 * Reads the given file, using the configured resolver plugins.
 */
// eslint-disable-next-line import/prefer-default-export
export const readFile = async (file: File, options: ReferenceOptions): Promise<Buffer> => {
  const optsBoundResolvers: Resolver[] = options.resolve.resolvers.map((resolver) => {
    const clonedResolver = Object.create(resolver);
    return Object.assign(clonedResolver, options.resolve.resolverOpts);
  });

  const resolvers: Resolver[] = await plugins.filter(
    'canRead',
    [file, options],
    optsBoundResolvers,
  );

  // we couldn't find any resolver for this File
  if (isEmpty(resolvers)) {
    throw new UnmatchedResolverError(file.uri);
  }

  try {
    const { result } = await plugins.run('read', [file], resolvers);
    return result;
  } catch (error: any) {
    throw new ResolveError(`Error while reading file "${file.uri}"`, { cause: error });
  }
};
