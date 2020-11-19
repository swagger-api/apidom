"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var SchemaVisitor = (0, _stampit["default"])(_generics.KindVisitor, _apidomParserAdapterYaml.SpecificationVisitor, {
  methods: {
    mapping: function mapping(mappingNode) {
      var objectElement = this.nodeToElement(['mapping'], mappingNode);
      var schemaElement = new this.namespace.elements.Schema(objectElement.content);
      this.element = this.maybeAddSourceMap(mappingNode, schemaElement);
      return _apidomParserAdapterYaml.BREAK;
    }
  }
});
var _default = SchemaVisitor;
exports["default"] = _default;