"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var TagsVisitor = (0, _stampit["default"])(_generics.KindVisitor, _apidomParserAdapterYaml.SpecificationVisitor, {
  methods: {
    sequence: function sequence(sequenceNode) {
      // @ts-ignore
      var result = _generics.KindVisitor.compose.methods.sequence.call(this, sequenceNode);

      this.element.classes.push('tags');
      return result;
    }
  }
});
var _default = TagsVisitor;
exports["default"] = _default;