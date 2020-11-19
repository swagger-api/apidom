"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports.keyMap = exports.BREAK = exports.visit = exports.ObjectVisitor = exports.ArrayVisitor = exports.ValueVisitor = exports.hasKeys = exports.hasKey = exports.appendMetadata = exports.addSourceMap = exports.mediaTypes = exports.detect = exports.namespace = exports.PatternedFieldsJsonObjectVisitor = exports.MixedFieldsJsonObjectVisitor = exports.MapJsonObjectVisitor = exports.FixedFieldsJsonObjectVisitor = exports.AlternatingVisitor = exports.DocumentVisitor = exports.ErrorVisitor = exports.SpecificationVisitor = exports.Visitor = exports.specification = exports.parse = void 0;

var _indexBrowser = _interopRequireWildcard(require("./parser/index-browser"));

exports.parse = _indexBrowser["default"];
exports.namespace = _indexBrowser.namespace;

var _adapter = require("./adapter");

exports.detect = _adapter.detect;
exports.mediaTypes = _adapter.mediaTypes;

var _specification = _interopRequireDefault(require("./parser/specification"));

exports.specification = _specification["default"];

var _sourceMap = require("./parser/source-map");

exports.addSourceMap = _sourceMap.addSourceMap;

var _metadata = require("./parser/metadata");

exports.appendMetadata = _metadata.appendMetadata;

var _predicates = require("./parser/predicates");

exports.hasKey = _predicates.hasKey;
exports.hasKeys = _predicates.hasKeys;

var _Visitor = _interopRequireDefault(require("./parser/visitors/Visitor"));

exports.Visitor = _Visitor["default"];

var _SpecificationVisitor = _interopRequireDefault(require("./parser/visitors/SpecificationVisitor"));

exports.SpecificationVisitor = _SpecificationVisitor["default"];

var _ErrorVisitor = _interopRequireDefault(require("./parser/visitors/ErrorVisitor"));

exports.ErrorVisitor = _ErrorVisitor["default"];

var _DocumentVisitor = _interopRequireDefault(require("./parser/visitors/DocumentVisitor"));

exports.DocumentVisitor = _DocumentVisitor["default"];

var _generics = require("./parser/visitors/generics");

exports.ValueVisitor = _generics.ValueVisitor;
exports.ArrayVisitor = _generics.ArrayVisitor;
exports.ObjectVisitor = _generics.ObjectVisitor;

var _AlternatingVisitor = _interopRequireDefault(require("./parser/visitors/generics/AlternatingVisitor"));

exports.AlternatingVisitor = _AlternatingVisitor["default"];

var _FixedFieldsJsonObjectVisitor = _interopRequireDefault(require("./parser/visitors/generics/FixedFieldsJsonObjectVisitor"));

exports.FixedFieldsJsonObjectVisitor = _FixedFieldsJsonObjectVisitor["default"];

var _MapJsonObjectVisitor = _interopRequireDefault(require("./parser/visitors/generics/MapJsonObjectVisitor"));

exports.MapJsonObjectVisitor = _MapJsonObjectVisitor["default"];

var _MixedFieldsJsonObjectVisitor = _interopRequireDefault(require("./parser/visitors/generics/MixedFieldsJsonObjectVisitor"));

exports.MixedFieldsJsonObjectVisitor = _MixedFieldsJsonObjectVisitor["default"];

var _PatternedFieldsJsonObjectVisitor = _interopRequireDefault(require("./parser/visitors/generics/PatternedFieldsJsonObjectVisitor"));

exports.PatternedFieldsJsonObjectVisitor = _PatternedFieldsJsonObjectVisitor["default"];

var _visitors = require("./parser/visitors");

exports.visit = _visitors.visit;
exports.BREAK = _visitors.BREAK;
exports.keyMap = _visitors.keyMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }