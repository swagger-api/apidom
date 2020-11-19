"use strict";

exports.__esModule = true;
exports.isAsyncApiExtension = void 0;

var _ramda = require("ramda");

var _apidomAst = require("apidom-ast");

// isAsyncApiExtension :: (Options, PropertyNode) -> Boolean
// eslint-disable-next-line import/prefer-default-export
var isAsyncApiExtension = (0, _ramda.curry)(function (options, node) {
  return (0, _ramda.both)(_apidomAst.isJsonProperty, (0, _ramda.pathSatisfies)((0, _ramda.startsWith)('x-'), ['key', 'value']))(node);
});
exports.isAsyncApiExtension = isAsyncApiExtension;