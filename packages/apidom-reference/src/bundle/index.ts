import { isEmpty, propEq } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';

import File from '../util/File';
import * as plugins from '../util/plugins';
import UnmatchedBundleStrategyError from '../errors/UnmatchedBundleStrategyError';
import BundleError from '../errors/BundleError';
import { ReferenceOptions as IReferenceOptions } from '../types';
import parse from '../parse';
import { merge as mergeOptions } from '../options/util';
import * as url from '../util/url';

/**
 * Bundle a file with all its external references to a compound document.
 */
const bundle = async (uri: string, options: IReferenceOptions): Promise<ParseResultElement> => {
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

  const file = File({
    uri: mergedOptions.resolve.baseURI,
    parseResult,
    mediaType: mergedOptions.parse.mediaType,
  });

  const bundleStrategies = await plugins.filter('canBundle', file, mergedOptions.bundle.strategies);

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
