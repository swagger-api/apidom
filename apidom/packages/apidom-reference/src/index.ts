import { ParseResultElement } from 'apidom';

import defaultOptions from './options';
import { merge as mergeOptions } from './options/util';
import parseFn from './parse';

// eslint-disable-next-line import/prefer-default-export
export const parse = (uri: string, options = {}): Promise<ParseResultElement> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return parseFn(uri, mergedOptions);
};
