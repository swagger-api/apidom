import { namespace } from 'apidom';

/* eslint-disable import/prefer-default-export */

// @ts-ignore
export const addSourceMap = (node, element) => {
  if (node === null) {
    return element;
  }

  // @ts-ignore
  const sourceMap = new namespace.elements.SourceMap();

  sourceMap.position = node.position;
  sourceMap.astNode = node;

  element.meta.set('sourceMap', sourceMap);

  return element;
};
