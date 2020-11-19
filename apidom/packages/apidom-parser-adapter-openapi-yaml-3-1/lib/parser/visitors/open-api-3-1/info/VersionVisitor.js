"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var VersionVisitor = (0, _stampit["default"])(_generics.KindVisitor, {
  methods: {
    scalar: function scalar(scalarNode) {
      // @ts-ignore
      var result = _generics.KindVisitor.compose.methods.scalar.call(this, scalarNode);

      (0, _apidomParserAdapterYaml.appendMetadata)(['version'], this.element);
      return result;
    }
  }
});
var _default = VersionVisitor;
exports["default"] = _default;