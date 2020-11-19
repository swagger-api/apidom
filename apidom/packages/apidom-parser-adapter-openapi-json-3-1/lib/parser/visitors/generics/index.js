"use strict";

exports.__esModule = true;
exports.ObjectVisitor = exports.ValueVisitor = exports.ArrayVisitor = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

exports.ArrayVisitor = _apidomParserAdapterJson.ArrayVisitor;
exports.ValueVisitor = _apidomParserAdapterJson.ValueVisitor;

var _predicates = require("../../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
// @ts-ignore
var ObjectVisitor = (0, _stampit["default"])(_apidomParserAdapterJson.ObjectVisitor, {
  init: function init() {
    this.specificationExtensionPredicate = (0, _predicates.isOpenApiExtension)({});
  }
});
exports.ObjectVisitor = ObjectVisitor;