"use strict";

exports.__esModule = true;
exports.visit = exports.keyMap = exports.BREAK = void 0;

var _apidomAst = require("apidom-ast");

exports.BREAK = _apidomAst.BREAK;

var _keyMapDefault;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable import/prefer-default-export */
var keyMapDefault = (_keyMapDefault = {}, _defineProperty(_keyMapDefault, _apidomAst.JsonDocument.type, ['child']), _defineProperty(_keyMapDefault, _apidomAst.JsonObject.type, ['properties']), _defineProperty(_keyMapDefault, _apidomAst.JsonProperty.type, ['key', 'value']), _defineProperty(_keyMapDefault, _apidomAst.JsonArray.type, ['items']), _defineProperty(_keyMapDefault, _apidomAst.Error.type, ['children']), _keyMapDefault);
exports.keyMap = keyMapDefault;

// @ts-ignore
var visit = function visit(root, visitor) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _ref$keyMap = _ref.keyMap,
      keyMap = _ref$keyMap === void 0 ? keyMapDefault : _ref$keyMap,
      rest = _objectWithoutProperties(_ref, ["keyMap"]);

  // @ts-ignore
  return (0, _apidomAst.visit)(root, visitor, _objectSpread(_objectSpread({}, rest), {}, {
    keyMap: keyMap
  }));
};

exports.visit = visit;