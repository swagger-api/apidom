import { isEmpty } from 'ramda';

import File from '../File.ts';
import Resolver from './resolvers/Resolver.ts';
import * as plugins from '../util/plugins.ts';
import ResolveError from '../errors/ResolveError.ts';
import UnmatchedResolverError from '../errors/UnmatchedResolverError.ts';
import type { ReferenceOptions } from '../options/index.ts';

const CACHE_NAME = 'apidom-file-cache';

/**
 * Reads the given file, using the configured resolver plugins.
 */
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

export const getCacheFileResult = async ({
  cacheKey,
  fileCacheTTL,
}: {
  cacheKey: string;
  fileCacheTTL: number;
}) => {
  if (fileCacheTTL === 0) {
    return null;
  }
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(cacheKey);

    if (response) {
      const { result, timestamp } = await response.json();
      const now = Date.now();

      // Check if the cache is still valid
      if (now - timestamp < fileCacheTTL) {
        return result;
      }

      await cache.delete(cacheKey);
    }
  } catch (error) {
    // If parsing cache fails, continue with normal parsing
    console.log('There was an error parsing the response');
    return null;
  }
  return null;
};

export const setCacheFileResult = async ({
  cacheKey,
  result,
  fileCacheTTL,
}: {
  cacheKey: string;
  result: unknown;
  fileCacheTTL: number;
}) => {
  if (fileCacheTTL === 0) {
    return;
  }
  try {
    const cacheData = {
      result,
      timestamp: Date.now(),
    };

    const cache = await caches.open(CACHE_NAME);
    const response = new Response(JSON.stringify(cacheData), {
      headers: { 'Content-Type': 'application/json' },
    });

    await cache.put(cacheKey, response);
  } catch (error) {
    // Silently fail if CacheStorage is not available
    console.error('CacheStorage is not available');
  }
};
