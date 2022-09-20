import { isEmpty } from 'ramda';

import {
  File as IFile,
  ReferenceOptions as IReferenceOptions,
  Resolver as IResolver,
} from '../types';
import * as plugins from '../util/plugins';
import { ResolverError, UnmatchedResolverError } from '../util/errors';

/**
 * Reads the given file, using the configured resolver plugins.
 */
// eslint-disable-next-line import/prefer-default-export
export const readFile = async (file: IFile, options: IReferenceOptions): Promise<Buffer> => {
  const resolvers: IResolver[] = await plugins.filter('canRead', file, options.resolve.resolvers);

  // we couldn't find any resolver for this File
  if (isEmpty(resolvers)) {
    throw new UnmatchedResolverError(file.uri);
  }

  try {
    const optsBoundResolvers = resolvers.map((resolver) => {
      const clonedResolver = Object.create(resolver);
      return Object.assign(clonedResolver, options.resolve.resolverOpts);
    });
    const { result } = await plugins.run('read', [file], optsBoundResolvers);
    return result;
  } catch (error: any) {
    throw new ResolverError(`Error while reading file "${file.uri}"`, error);
  }
};
