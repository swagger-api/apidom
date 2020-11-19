"use strict";

exports.__esModule = true;
exports.MappingVisitor = exports.KindVisitor = exports.SequenceVisitor = exports.ScalarVisitor = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

exports.ScalarVisitor = _apidomParserAdapterYaml.ScalarVisitor;
exports.SequenceVisitor = _apidomParserAdapterYaml.SequenceVisitor;
exports.KindVisitor = _apidomParserAdapterYaml.KindVisitor;

var _predicates = require("../../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
// @ts-ignore
var MappingVisitor = (0, _stampit["default"])(_apidomParserAdapterYaml.MappingVisitor, {
  init: function init() {
    this.specificationExtensionPredicate = (0, _predicates.isOpenApiExtension)({});
  }
});
exports.MappingVisitor = MappingVisitor;