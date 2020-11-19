"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _predicates = require("../../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var FixedFieldsYamlMappingVisitor = (0, _stampit["default"])(_apidomParserAdapterYaml.FixedFieldsYamlMappingVisitor, {
  props: {
    specificationExtensionPredicate: (0, _predicates.isAsyncApiExtension)({})
  }
});
var _default = FixedFieldsYamlMappingVisitor;
exports["default"] = _default;