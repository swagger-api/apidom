import { isEmpty, propEq } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';

import File from '../File.ts';
import * as plugins from '../util/plugins.ts';
import UnmatchedBundleStrategyError from '../errors/UnmatchedBundleStrategyError.ts';
import BundleError from '../errors/BundleError.ts';
import parse from '../parse/index.ts';
import { merge as mergeOptions } from '../options/util.ts';
import * as url from '../util/url.ts';
import type { ReferenceOptions } from '../options/index.ts';

/**
 * Bundle a file with all its external references to a compound document.
 */
const bundle = async (uri: string, options: ReferenceOptions): Promise<ParseResultElement> => {
  const { refSet } = options.bundle;
  const sanitizedURI = url.sanitize(uri);
  const mergedOptions = mergeOptions(options, { resolve: { baseURI: sanitizedURI } });
  let parseResult;

  // if refSet was provided, use it to avoid unnecessary parsing
  if (refSet !== null && refSet.has(sanitizedURI)) {
    // @ts-ignore
    ({ value: parseResult } = refSet.find(propEq(sanitizedURI, 'uri')));
  } else {
    parseResult = await parse(uri, mergedOptions);
  }

  const file = new File({
    uri: mergedOptions.resolve.baseURI,
    parseResult,
    mediaType: mergedOptions.parse.mediaType,
  });

  const bundleStrategies = await plugins.filter(
    'canBundle',
    [file, mergedOptions],
    mergedOptions.bundle.strategies,
  );

  // we couldn't find any bundle strategy for this File
  if (isEmpty(bundleStrategies)) {
    throw new UnmatchedBundleStrategyError(file.uri);
  }

  try {
    const { result } = await plugins.run('bundle', [file, mergedOptions], bundleStrategies);
    return result;
  } catch (error: any) {
    throw new BundleError(`Error while bundling file "${file.uri}"`, { cause: error });
  }
};

export default bundle;
