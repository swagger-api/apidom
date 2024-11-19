import { ObjectElement } from 'minim';

import deepmerge, { defaultOptions as defaultDeepmergeOptions, emptyElement } from './deepmerge.ts';
import type { ObjectOrArrayElement, DeepMergeUserOptions, AnyElement } from './deepmerge.ts';

/**
 * @public
 */
export type MergeRightOptions = Omit<DeepMergeUserOptions, 'customMerge' | 'clone'>;

/**
 * @public
 */
const mergeRight = (
  targetElement: ObjectOrArrayElement,
  sourceElement: ObjectOrArrayElement,
  options?: MergeRightOptions,
): AnyElement => {
  const mergedOptions = {
    ...defaultDeepmergeOptions,
    ...options,
    customMerge: () => (target: ObjectOrArrayElement, source: ObjectOrArrayElement) => source,
    clone: false,
  };

  return deepmerge(targetElement, sourceElement, mergedOptions);
};

mergeRight.all = (list: ObjectOrArrayElement[], options?: MergeRightOptions) => {
  if (!Array.isArray(list)) {
    throw new TypeError('First argument of mergeRight should be an array.');
  }
  if (list.length === 0) {
    return new ObjectElement();
  }

  return list.reduce((target, source) => {
    return mergeRight(target, source, options);
  }, emptyElement(list[0]));
};

export default mergeRight;
