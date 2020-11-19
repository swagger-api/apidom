"use strict";

exports.__esModule = true;
exports.includesClasses = exports.includesSymbols = exports.hasElementSourceMap = exports.isSourceMapElement = exports.isRefElement = exports.isLinkElement = exports.isMemberElement = exports.isObjectElement = exports.isArrayElement = exports.isBooleanElement = exports.isNullElement = exports.isNumberElement = exports.isStringElement = exports.isElement = void 0;

var _minim = require("minim");

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _SourceMap = _interopRequireDefault(require("../elements/SourceMap"));

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isElement = (0, _helpers["default"])(function (_ref) {
  var hasBasicElementProps = _ref.hasBasicElementProps,
      primitiveEq = _ref.primitiveEq;
  var primitiveEqUndefined = primitiveEq(undefined);
  return (0, _ramda.either)((0, _ramda.is)(_minim.Element), (0, _ramda.both)(hasBasicElementProps, primitiveEqUndefined));
});
exports.isElement = isElement;
var isStringElement = (0, _helpers["default"])(function (_ref2) {
  var hasBasicElementProps = _ref2.hasBasicElementProps,
      isElementType = _ref2.isElementType,
      primitiveEq = _ref2.primitiveEq;
  var isElementTypeString = isElementType('string');
  var primitiveEqString = primitiveEq('string');
  return (0, _ramda.either)((0, _ramda.is)(_minim.StringElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeString, primitiveEqString]));
});
exports.isStringElement = isStringElement;
var isNumberElement = (0, _helpers["default"])(function (_ref3) {
  var hasBasicElementProps = _ref3.hasBasicElementProps,
      isElementType = _ref3.isElementType,
      primitiveEq = _ref3.primitiveEq;
  var isElementTypeNumber = isElementType('number');
  var primitiveEqNumber = primitiveEq('number');
  return (0, _ramda.either)((0, _ramda.is)(_minim.NumberElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeNumber, primitiveEqNumber]));
});
exports.isNumberElement = isNumberElement;
var isNullElement = (0, _helpers["default"])(function (_ref4) {
  var hasBasicElementProps = _ref4.hasBasicElementProps,
      isElementType = _ref4.isElementType,
      primitiveEq = _ref4.primitiveEq;
  var isElementTypeNull = isElementType('null');
  var primitiveEqNull = primitiveEq('null');
  return (0, _ramda.either)((0, _ramda.is)(_minim.NullElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeNull, primitiveEqNull]));
});
exports.isNullElement = isNullElement;
var isBooleanElement = (0, _helpers["default"])(function (_ref5) {
  var hasBasicElementProps = _ref5.hasBasicElementProps,
      isElementType = _ref5.isElementType,
      primitiveEq = _ref5.primitiveEq;
  var isElementTypeBoolean = isElementType('boolean');
  var primitiveEqBoolean = primitiveEq('boolean');
  return (0, _ramda.either)((0, _ramda.is)(_minim.BooleanElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeBoolean, primitiveEqBoolean]));
});
exports.isBooleanElement = isBooleanElement;
var isArrayElement = (0, _helpers["default"])(function (_ref6) {
  var hasBasicElementProps = _ref6.hasBasicElementProps,
      isElementType = _ref6.isElementType,
      primitiveEq = _ref6.primitiveEq,
      hasMethod = _ref6.hasMethod;
  var isElementTypeArray = isElementType('array');
  var primitiveEqArray = primitiveEq('array');
  var hasMethodPush = hasMethod('push');
  var hasMethodUnshift = hasMethod('unshift');
  var hasMethodMap = hasMethod('map');
  var hasMethodReduce = hasMethod('reduce');
  return (0, _ramda.either)((0, _ramda.is)(_minim.ArrayElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeArray, primitiveEqArray, hasMethodPush, hasMethodUnshift, hasMethodMap, hasMethodReduce]));
});
exports.isArrayElement = isArrayElement;
var isObjectElement = (0, _helpers["default"])(function (_ref7) {
  var hasBasicElementProps = _ref7.hasBasicElementProps,
      isElementType = _ref7.isElementType,
      primitiveEq = _ref7.primitiveEq,
      hasMethod = _ref7.hasMethod;
  var isElementTypeObject = isElementType('object');
  var primitiveEqObject = primitiveEq('object');
  var hasMethodKeys = hasMethod('keys');
  var hasMethodValues = hasMethod('values');
  var hasMethodItems = hasMethod('items');
  return (0, _ramda.either)((0, _ramda.is)(_minim.ObjectElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeObject, primitiveEqObject, hasMethodKeys, hasMethodValues, hasMethodItems]));
});
exports.isObjectElement = isObjectElement;
var isMemberElement = (0, _helpers["default"])(function (_ref8) {
  var hasBasicElementProps = _ref8.hasBasicElementProps,
      isElementType = _ref8.isElementType,
      primitiveEq = _ref8.primitiveEq;
  var isElementTypeMember = isElementType('member');
  var primitiveEqUndefined = primitiveEq(undefined);
  return (0, _ramda.either)((0, _ramda.is)(_minim.MemberElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeMember, primitiveEqUndefined]));
});
exports.isMemberElement = isMemberElement;
var isLinkElement = (0, _helpers["default"])(function (_ref9) {
  var hasBasicElementProps = _ref9.hasBasicElementProps,
      isElementType = _ref9.isElementType,
      primitiveEq = _ref9.primitiveEq;
  var isElementTypeLink = isElementType('link');
  var primitiveEqUndefined = primitiveEq(undefined);
  return (0, _ramda.either)((0, _ramda.is)(_minim.LinkElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeLink, primitiveEqUndefined]));
});
exports.isLinkElement = isLinkElement;
var isRefElement = (0, _helpers["default"])(function (_ref10) {
  var hasBasicElementProps = _ref10.hasBasicElementProps,
      isElementType = _ref10.isElementType,
      primitiveEq = _ref10.primitiveEq;
  var isElementTypeRef = isElementType('ref');
  var primitiveEqUndefined = primitiveEq(undefined);
  return (0, _ramda.either)((0, _ramda.is)(_minim.RefElement), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeRef, primitiveEqUndefined]));
});
exports.isRefElement = isRefElement;
var isSourceMapElement = (0, _helpers["default"])(function (_ref11) {
  var hasBasicElementProps = _ref11.hasBasicElementProps,
      isElementType = _ref11.isElementType,
      primitiveEq = _ref11.primitiveEq;
  var isElementTypeSourceMap = isElementType('sourceMap');
  var primitiveEqArray = primitiveEq('array');
  return (0, _ramda.either)((0, _ramda.is)(_SourceMap["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeSourceMap, primitiveEqArray]));
});
exports.isSourceMapElement = isSourceMapElement;
var hasElementSourceMap = (0, _helpers["default"])(function () {
  return function (element) {
    return isSourceMapElement(element.meta.get('sourceMap'));
  };
});
exports.hasElementSourceMap = hasElementSourceMap;
var includesSymbols = (0, _ramda.curry)(function (symbols, element) {
  if ((0, _ramda.isEmpty)(symbols)) {
    return true;
  }

  var elementSymbols = element.attributes.get('symbols');

  if (!isArrayElement(elementSymbols)) {
    return false;
  }

  return (0, _ramda.all)((0, _ramdaAdjunct.included)(elementSymbols.toValue()), symbols);
});
exports.includesSymbols = includesSymbols;
var includesClasses = (0, _ramda.curry)(function (classes, element) {
  if ((0, _ramda.isEmpty)(classes)) {
    return true;
  }

  return (0, _ramda.all)((0, _ramdaAdjunct.included)(element.classes.toValue()), classes);
});
exports.includesClasses = includesClasses;