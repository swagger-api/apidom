import { ParseResultElement } from 'apidom';

import { ReferenceSet as IReferenceSet } from './types';
import defaultOptions from './options';
import { merge as mergeOptions } from './options/util';
import parseFn from './parse';
import resolveFn from './resolve';

export const parse = async (uri: string, options = {}): Promise<ParseResultElement> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return parseFn(uri, mergedOptions);
};

export const resolve = async (uri: string, options = {}): Promise<IReferenceSet> => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  return resolveFn(uri, mergedOptions);
};

export { resolveApiDOM } from './resolve';
