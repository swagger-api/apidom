"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var SchemaVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _apidomParserAdapterJson.SpecificationVisitor, {
  methods: {
    object: function object(objectNode) {
      var objectElement = this.nodeToElement(['object'], objectNode);
      var schemaElement = new this.namespace.elements.Schema(objectElement.content);
      this.element = this.maybeAddSourceMap(objectNode, schemaElement);
      return _apidomParserAdapterJson.BREAK;
    }
  }
});
var _default = SchemaVisitor;
exports["default"] = _default;