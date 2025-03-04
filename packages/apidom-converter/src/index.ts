import { ParseResultElement } from '@swagger-api/apidom-core';
import { mergeOptions, bundle, File } from '@swagger-api/apidom-reference';

import defaultOptions, { ConverterOptions } from './options/index.ts';
import ConvertError from './errors/ConvertError.ts';
import UnmatchedConvertStrategyError from './errors/UnmatchedConvertStrategyError.ts';

export { ConvertError, UnmatchedConvertStrategyError };

/**
 * `convertApiDOM` already assumes that the ApiDOM is bundled.
 * @public
 */
export const convertApiDOM = async (element: ParseResultElement, options = {}) => {
  const mergedOptions = mergeOptions(defaultOptions, options || {}) as ConverterOptions;
  const file = new File({
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

/**
 * @public
 */
const convert = async (uri: string, options = {}) => {
  const mergedOptions = mergeOptions(defaultOptions, options || {}) as ConverterOptions;
  const parseResult = await bundle(uri, mergedOptions);

  return convertApiDOM(parseResult, mergedOptions);
};

export default convert;
