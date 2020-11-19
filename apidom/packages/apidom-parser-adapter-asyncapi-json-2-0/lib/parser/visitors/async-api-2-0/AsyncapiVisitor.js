"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _generics = require("../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var AsyncapiVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _apidomParserAdapterJson.SpecificationVisitor, {
  methods: {
    string: function string(stringNode) {
      var asyncapiElement = new this.namespace.elements.Asyncapi(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, asyncapiElement);
      return _apidomParserAdapterJson.BREAK;
    }
  }
});
var _default = AsyncapiVisitor;
exports["default"] = _default;