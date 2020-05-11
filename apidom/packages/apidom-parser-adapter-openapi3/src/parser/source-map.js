'use strict';

const { namespace } = require('apidom');

const addSourceMap = (node, element) => {
  const sourceMap = new namespace.elements.SourceMap();

  sourceMap.position = node.position;
  sourceMap.astNode = node;

  element.meta.set('sourceMap', sourceMap);

  return element;
};


module.exports = {
  addSourceMap,
};
