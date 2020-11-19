"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports.toValue = exports.fromJSONString = exports.fromJSON = exports.toJSONString = exports.toJSON = exports.createNamespace = exports.traverse = exports.some = exports.findAtOffset = exports.find = exports.reject = exports.filter = exports.ArraySlice = exports.includesClasses = exports.includesSymbols = exports.hasElementSourceMap = exports.isSourceMapElement = exports.isRefElement = exports.isLinkElement = exports.isMemberElement = exports.isObjectElement = exports.isArrayElement = exports.isBooleanElement = exports.isNullElement = exports.isNumberElement = exports.isStringElement = exports.isElement = exports.Namespace = exports.createPredicate = exports.SourceMapElement = exports.ParseResultElement = exports.CommentElement = exports.AnnotationElement = exports.namespace = void 0;

var _ramdaAdjunct = require("ramda-adjunct");

var _namespace = _interopRequireWildcard(require("./namespace"));

exports.namespace = _namespace["default"];
exports.Namespace = _namespace.Namespace;

var _Annotation = _interopRequireDefault(require("./elements/Annotation"));

exports.AnnotationElement = _Annotation["default"];

var _Comment = _interopRequireDefault(require("./elements/Comment"));

exports.CommentElement = _Comment["default"];

var _ParseResult = _interopRequireDefault(require("./elements/ParseResult"));

exports.ParseResultElement = _ParseResult["default"];

var _SourceMap = _interopRequireDefault(require("./elements/SourceMap"));

exports.SourceMapElement = _SourceMap["default"];

var _predicates = require("./predicates");

exports.isElement = _predicates.isElement;
exports.isStringElement = _predicates.isStringElement;
exports.isNumberElement = _predicates.isNumberElement;
exports.isNullElement = _predicates.isNullElement;
exports.isBooleanElement = _predicates.isBooleanElement;
exports.isArrayElement = _predicates.isArrayElement;
exports.isObjectElement = _predicates.isObjectElement;
exports.isMemberElement = _predicates.isMemberElement;
exports.isLinkElement = _predicates.isLinkElement;
exports.isRefElement = _predicates.isRefElement;
exports.isSourceMapElement = _predicates.isSourceMapElement;
exports.hasElementSourceMap = _predicates.hasElementSourceMap;
exports.includesSymbols = _predicates.includesSymbols;
exports.includesClasses = _predicates.includesClasses;

var _helpers = _interopRequireDefault(require("./predicates/helpers"));

exports.createPredicate = _helpers["default"];

var _minim = require("minim");

exports.ArraySlice = _minim.ArraySlice;

var _traversal = require("./traversal");

exports.filter = _traversal.filter;
exports.reject = _traversal.reject;
exports.find = _traversal.find;
exports.findAtOffset = _traversal.findAtOffset;
exports.some = _traversal.some;
exports.traverse = _traversal.traverse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createNamespace = function createNamespace(namespacePlugin) {
  var namespace = new _namespace.Namespace();

  if ((0, _ramdaAdjunct.isPlainObject)(namespacePlugin)) {
    namespace.use(namespacePlugin);
  }

  return namespace;
};

exports.createNamespace = createNamespace;

var toJSON = function toJSON(namespace, element) {
  return namespace.toRefract(element);
};

exports.toJSON = toJSON;

var toJSONString = function toJSONString(namespace, element) {
  return JSON.stringify(toJSON(namespace, element));
};

exports.toJSONString = toJSONString;

var fromJSON = function fromJSON(namespace, json) {
  return namespace.fromRefract(json);
};

exports.fromJSON = fromJSON;

var fromJSONString = function fromJSONString(namespace, jsonString) {
  return fromJSON(namespace, JSON.parse(jsonString));
}; // Reconstructs the ApiDOM into JavaScript POJO.
// This POJO would be  the result of parsing the original
// JSON string with JSON.parse function.


exports.fromJSONString = fromJSONString;

var toValue = function toValue(element) {
  return element.toValue();
};

exports.toValue = toValue;