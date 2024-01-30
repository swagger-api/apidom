import { ParseResultElement } from '@swagger-api/apidom-core';
import { mergeOptions, bundle, File } from '@swagger-api/apidom-reference';

import defaultOptions, { ConverterOptions } from './options';
import ConvertError from './errors/ConvertError';
import UnmatchedConvertStrategyError from './errors/UnmatchedConvertStrategyError';

export { ConvertError, UnmatchedConvertStrategyError };

/**
 * `convertApiDOM` already assumes that the ApiDOM is bundled.
 */
export const convertApiDOM = async (element: ParseResultElement, options = {}) => {
  const mergedOptions = mergeOptions(defaultOptions, options || {}) as ConverterOptions;
  const file = File({
    uri: mergedOptions.resolve.baseURI,
    parseResult: element,
    mediaType: mergedOptions.convert.sourceMediaType || mergedOptions.parse.mediaType,
  });
  const strategy = mergedOptions.convert.strategies.find((s) => s.canConvert(file, mergedOptions));

  if (typeof strategy === 'undefined') {
    throw new UnmatchedConvertStrategyError(file.uri);
  }

  return strategy.convert(file, mergedOptions);
};

const convert = async (uri: string, options = {}) => {
  const mergedOptions = mergeOptions(defaultOptions, options || {}) as ConverterOptions;
  const parseResult = await bundle(uri, mergedOptions);

  return convertApiDOM(parseResult, mergedOptions);
};

export default convert;
