"use strict";

exports.__esModule = true;
exports.isRequestBodyObject = exports.isServerObject = exports.isResponseObject = exports.isReferenceObject = exports.isParameterObject = exports.isOpenApiExtension = exports.isComponentsSchemas = void 0;

var _apidomAst = require("apidom-ast");

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

// @ts-ignore
// isComponentsSchemas :: (Options, PropertyNode) -> Boolean
// @ts-ignore
var isComponentsSchemas = function isComponentsSchemas(_ref, node) {
  var ancestors = _ref.ancestors;
  var totalAncestors = (0, _ramda.length)(ancestors);
  return (0, _ramdaAdjunct.isInteger)(totalAncestors) && (0, _ramda.pathEq)(['key', 'value'], 'schemas', node) && (0, _ramda.pathEq)([totalAncestors - 2, 'key', 'value'], 'components', ancestors);
}; // isOpenApiExtension :: Options -> JsonProperty -> Boolean


exports.isComponentsSchemas = isComponentsSchemas;
var isOpenApiExtension = (0, _ramda.curry)(function (options, node) {
  return (0, _ramda.both)(_apidomAst.isJsonProperty, (0, _ramda.pathSatisfies)((0, _ramda.startsWith)('x-'), ['key', 'value']))(node);
}); // isParameterObject :: Options -> JsonObject -> Boolean

exports.isOpenApiExtension = isOpenApiExtension;
var isParameterObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isJsonObject)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterJson.hasKeys)(['name', 'in'], node.properties);
}); // isReferenceObject :: Options -> JsonObject -> Boolean

exports.isParameterObject = isParameterObject;
var isReferenceObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isJsonObject)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterJson.hasKeys)(['$ref'], node.properties);
}); // isResponseObject :: Options -> JsonObject -> Boolean

exports.isReferenceObject = isReferenceObject;
var isResponseObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isJsonObject)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterJson.hasKeys)(['description'], node.properties);
}); // isServerObject :: Options -> JsonObject -> Boolean

exports.isResponseObject = isResponseObject;
var isServerObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isJsonObject)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterJson.hasKeys)(['url'], node.properties);
}); // isRequestBodyObject :: Options -> JsonObject -> Boolean

exports.isServerObject = isServerObject;
var isRequestBodyObject = (0, _ramda.curry)(function (options, node) {
  if (!(0, _apidomAst.isJsonObject)(node)) {
    return false;
  }

  return (0, _apidomParserAdapterJson.hasKeys)(['content'], node.properties);
});
exports.isRequestBodyObject = isRequestBodyObject;