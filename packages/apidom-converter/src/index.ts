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

  try {
    return strategy.convert(file, mergedOptions);
  } catch (error) {
    throw new ConvertError(`Error while converting file "${file.uri}"`, { cause: error, strategy });
  }
};

const convert = async (uri: string, options = {}) => {
  const mergedOptions = mergeOptions(defaultOptions, options || {}) as ConverterOptions;
  const parseResult = await bundle(uri, mergedOptions);

  return convertApiDOM(parseResult, mergedOptions);
};

export default convert;
