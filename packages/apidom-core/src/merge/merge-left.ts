import mergeRight from './merge-right.ts';

/**
 * @public
 */
const mergeLeft: typeof mergeRight = (...[sourceElement, targetElement, options]) => {
  return mergeRight(targetElement, sourceElement, options);
};

mergeLeft.all = ((...[list, options]) => {
  return mergeRight.all([...list].reverse(), options);
}) as typeof mergeRight.all;

export default mergeLeft;
