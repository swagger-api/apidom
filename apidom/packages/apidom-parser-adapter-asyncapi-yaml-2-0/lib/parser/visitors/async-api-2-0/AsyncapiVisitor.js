"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _generics = require("../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var AsyncapiVisitor = (0, _stampit["default"])(_generics.KindVisitor, _apidomParserAdapterYaml.SpecificationVisitor, {
  methods: {
    scalar: function scalar(scalarNode) {
      var asyncapiElement = new this.namespace.elements.Asyncapi(scalarNode.content);
      this.element = this.maybeAddSourceMap(scalarNode, asyncapiElement);
      return _apidomParserAdapterYaml.BREAK;
    }
  }
});
var _default = AsyncapiVisitor;
exports["default"] = _default;