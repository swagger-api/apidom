"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _generics = require("../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var OpenapiVisitor = (0, _stampit["default"])(_generics.KindVisitor, _apidomParserAdapterYaml.SpecificationVisitor, {
  methods: {
    scalar: function scalar(scalarNode) {
      var openapiElement = new this.namespace.elements.Openapi(scalarNode.content);
      this.element = this.maybeAddSourceMap(scalarNode, openapiElement);
      return _apidomParserAdapterYaml.BREAK;
    }
  }
});
var _default = OpenapiVisitor;
exports["default"] = _default;