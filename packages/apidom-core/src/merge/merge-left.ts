import mergeRight from './merge-right';

const mergeLeft = (...[sourceElement, targetElement, options]: Parameters<typeof mergeRight>) => {
  return mergeRight(targetElement, sourceElement, options);
};

mergeLeft.all = (...[list, options]: Parameters<typeof mergeRight.all>) => {
  return mergeRight.all([...list].reverse(), options);
};

export default mergeLeft;
