"use strict";

exports.__esModule = true;
exports.isAsyncApiExtension = void 0;

var _ramda = require("ramda");

var _apidomAst = require("apidom-ast");

// isAsyncApiExtension :: (Options, YamlKeyValuePair) -> Boolean
// eslint-disable-next-line import/prefer-default-export
var isAsyncApiExtension = (0, _ramda.curry)(function (options, node) {
  return (0, _ramda.both)(_apidomAst.isYamlKeyValuePair, (0, _ramda.pathSatisfies)((0, _ramda.startsWith)('x-'), ['key', 'content']))(node);
});
exports.isAsyncApiExtension = isAsyncApiExtension;