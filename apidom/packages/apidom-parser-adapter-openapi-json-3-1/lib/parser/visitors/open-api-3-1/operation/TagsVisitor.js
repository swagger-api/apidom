"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var TagsVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _apidomParserAdapterJson.SpecificationVisitor, {
  methods: {
    array: function array(arrayNode) {
      // @ts-ignore
      var result = _generics.ValueVisitor.compose.methods.array.call(this, arrayNode);

      this.element.classes.push('tags');
      return result;
    }
  }
});
var _default = TagsVisitor;
exports["default"] = _default;