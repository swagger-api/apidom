import { isEmpty } from 'ramda';

import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  Resolver as IResolver,
} from '../types';
import * as plugins from '../util/plugins';
import ResolverError from '../errors/ResolverError';
import UnmatchedResolverError from '../errors/UnmatchedResolverError';

/**
 * Reads the given file, using the configured resolver plugins.
 */
// eslint-disable-next-line import/prefer-default-export
export const readFile = async (file: IFile, options: IReferenceOptions): Promise<Buffer> => {
  const optsBoundResolvers: IResolver[] = options.resolve.resolvers.map((resolver) => {
    const clonedResolver = Object.create(resolver);
    return Object.assign(clonedResolver, options.resolve.resolverOpts);
  });

  const resolvers: IResolver[] = await plugins.filter('canRead', file, optsBoundResolvers);

  // we couldn't find any resolver for this File
  if (isEmpty(resolvers)) {
    throw new UnmatchedResolverError(file.uri);
  }

  try {
    const { result } = await plugins.run('read', [file], resolvers);
    return result;
  } catch (error: any) {
    throw new ResolverError(`Error while reading file "${file.uri}"`, { cause: error });
  }
};
