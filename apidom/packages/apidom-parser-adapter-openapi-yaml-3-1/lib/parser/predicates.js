"use strict";

exports.__esModule = true;
exports.isResponseObject = exports.isRequestBodyObject = exports.isReferenceObject = exports.isParameterObject = exports.isServerObject = exports.isOpenApiExtension = void 0;

var _apidomAst = require("apidom-ast");

var _ramda = require("ramda");

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

// @ts-ignore
// isOpenApiExtension :: Options -> YamlKeyValuePair -> Boolean
var isOpenApiExtension = (0, _ramda.curry)(function (options, node) {
  return (0, _ramda.both)(_apidomAst.isYamlKeyValuePair, (0, _ramda.pathSatisfies)((0, _ramda.startsWith)('x-'), ['key', 'content']))(node);
}); // isServerObject :: Options -> YamlMapping -> Boolean

exports.isOpenApiExtension = isOpenApiExtension;
var isServerObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isYamlMapping)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterYaml.hasKeys)(['url'], node.content);
}); // isParameterObject :: Options -> YamlMapping -> Boolean

exports.isServerObject = isServerObject;
var isParameterObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isYamlMapping)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterYaml.hasKeys)(['name', 'in'], node.content);
}); // isReferenceObject :: Options -> YamlMapping -> Boolean

exports.isParameterObject = isParameterObject;
var isReferenceObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isYamlMapping)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterYaml.hasKeys)(['$ref'], node.content);
}); // isRequestBodyObject :: Options -> YamlMapping -> Boolean

exports.isReferenceObject = isReferenceObject;
var isRequestBodyObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isYamlMapping)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterYaml.hasKeys)(['content'], node.content);
}); // isResponseObject :: Options -> YamlMapping -> Boolean

exports.isRequestBodyObject = isRequestBodyObject;
var isResponseObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isYamlMapping)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterYaml.hasKeys)(['description'], node.content);
});
exports.isResponseObject = isResponseObject;