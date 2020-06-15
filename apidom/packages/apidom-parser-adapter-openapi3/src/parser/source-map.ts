import { namespace } from 'apidom';

// eslint-disable-next-line import/prefer-default-export
export const addSourceMap = (node, element) => {
  const sourceMap = new namespace.elements.SourceMap();

  sourceMap.position = node.position;
  sourceMap.astNode = node;

  element.meta.set('sourceMap', sourceMap);

  return element;
};
