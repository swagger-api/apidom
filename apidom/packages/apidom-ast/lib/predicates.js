"use strict";

exports.__esModule = true;
exports.isParseResult = exports.isPoint = exports.isPosition = exports.isLiteral = exports.isNodeType = void 0;

var _ramda = require("ramda");

var isNodeType = (0, _ramda.pathEq)(['type']);
exports.isNodeType = isNodeType;
var isLiteral = isNodeType('literal');
exports.isLiteral = isLiteral;
var isPosition = isNodeType('position');
exports.isPosition = isPosition;
var isPoint = isNodeType('point');
exports.isPoint = isPoint;
var isParseResult = isNodeType('parseResult');
exports.isParseResult = isParseResult;