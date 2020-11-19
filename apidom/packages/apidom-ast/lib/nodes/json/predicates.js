"use strict";

exports.__esModule = true;
exports.isKey = exports.isProperty = exports.isEscapeSequence = exports.isStringContent = exports.isObject = exports.isArray = exports.isNumber = exports.isNull = exports.isTrue = exports.isFalse = exports.isString = void 0;

var _predicates = require("../../predicates");

var isString = (0, _predicates.isNodeType)('string');
exports.isString = isString;
var isFalse = (0, _predicates.isNodeType)('false');
exports.isFalse = isFalse;
var isTrue = (0, _predicates.isNodeType)('true');
exports.isTrue = isTrue;
var isNull = (0, _predicates.isNodeType)('null');
exports.isNull = isNull;
var isNumber = (0, _predicates.isNodeType)('number');
exports.isNumber = isNumber;
var isArray = (0, _predicates.isNodeType)('array');
exports.isArray = isArray;
var isObject = (0, _predicates.isNodeType)('object');
exports.isObject = isObject;
var isStringContent = (0, _predicates.isNodeType)('stringContent');
exports.isStringContent = isStringContent;
var isEscapeSequence = (0, _predicates.isNodeType)('escapeSequence');
exports.isEscapeSequence = isEscapeSequence;
var isProperty = (0, _predicates.isNodeType)('property');
exports.isProperty = isProperty;
var isKey = (0, _predicates.isNodeType)('key');
exports.isKey = isKey;