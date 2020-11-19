"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _predicates = require("../../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var MixedFieldsYamlMappingVisitor = (0, _stampit["default"])(_apidomParserAdapterYaml.MixedFieldsYamlMappingVisitor, {
  props: {
    specificationExtensionPredicate: (0, _predicates.isOpenApiExtension)({})
  }
});
var _default = MixedFieldsYamlMappingVisitor;
exports["default"] = _default;