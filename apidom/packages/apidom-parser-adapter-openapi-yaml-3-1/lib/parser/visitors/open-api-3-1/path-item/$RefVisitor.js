"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var $RefVisitor = (0, _stampit["default"])(_generics.KindVisitor, _apidomParserAdapterYaml.SpecificationVisitor, {
  methods: {
    scalar: function scalar(scalarNode) {
      var content = scalarNode.content;
      var refElement = new this.namespace.elements.Ref(content);
      refElement.path = content;
      this.element = this.maybeAddSourceMap(scalarNode, refElement);
      return _apidomParserAdapterYaml.BREAK;
    }
  }
});
var _default = $RefVisitor;
exports["default"] = _default;