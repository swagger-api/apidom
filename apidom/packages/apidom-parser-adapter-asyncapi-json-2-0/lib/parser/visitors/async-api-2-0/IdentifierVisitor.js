"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _generics = require("../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var IdentifierVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _apidomParserAdapterJson.SpecificationVisitor, {
  methods: {
    string: function string(stringNode) {
      var identifierElement = new this.namespace.elements.Identifier(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, identifierElement);
      return _apidomParserAdapterJson.BREAK;
    }
  }
});
var _default = IdentifierVisitor;
exports["default"] = _default;