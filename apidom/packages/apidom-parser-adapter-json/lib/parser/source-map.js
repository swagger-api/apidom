"use strict";

exports.__esModule = true;
exports.addSourceMap = void 0;

var _apidom = require("apidom");

/* eslint-disable import/prefer-default-export */
// @ts-ignore
var addSourceMap = function addSourceMap(node, element) {
  // @ts-ignore
  var sourceMap = new _apidom.namespace.elements.SourceMap();
  sourceMap.position = node.position;
  sourceMap.astNode = node;
  element.meta.set('sourceMap', sourceMap);
  return element;
};

exports.addSourceMap = addSourceMap;