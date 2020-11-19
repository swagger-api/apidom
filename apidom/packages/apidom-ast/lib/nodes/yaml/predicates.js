"use strict";

exports.__esModule = true;
exports.isComment = exports.isDirective = exports.isAlias = exports.isScalar = exports.isTag = exports.isKeyValuePair = exports.isSequence = exports.isMapping = exports.isDocument = exports.isStream = void 0;

var _predicates = require("../../predicates");

var isStream = (0, _predicates.isNodeType)('stream');
exports.isStream = isStream;
var isDocument = (0, _predicates.isNodeType)('document');
exports.isDocument = isDocument;
var isMapping = (0, _predicates.isNodeType)('mapping');
exports.isMapping = isMapping;
var isSequence = (0, _predicates.isNodeType)('sequence');
exports.isSequence = isSequence;
var isKeyValuePair = (0, _predicates.isNodeType)('keyValuePair');
exports.isKeyValuePair = isKeyValuePair;
var isTag = (0, _predicates.isNodeType)('tag');
exports.isTag = isTag;
var isScalar = (0, _predicates.isNodeType)('scalar');
exports.isScalar = isScalar;
var isAlias = (0, _predicates.isNodeType)('alias');
exports.isAlias = isAlias;
var isDirective = (0, _predicates.isNodeType)('directive');
exports.isDirective = isDirective;
var isComment = (0, _predicates.isNodeType)('comment');
exports.isComment = isComment;