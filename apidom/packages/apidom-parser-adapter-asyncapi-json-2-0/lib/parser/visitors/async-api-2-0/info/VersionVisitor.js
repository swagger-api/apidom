"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var VersionVisitor = (0, _stampit["default"])(_generics.ValueVisitor, {
  methods: {
    string: function string(stringNode) {
      // @ts-ignore
      var result = _generics.ValueVisitor.compose.methods.string.call(this, stringNode);

      (0, _apidomParserAdapterJson.appendMetadata)(['version'], this.element);
      return result;
    }
  }
});
var _default = VersionVisitor;
exports["default"] = _default;