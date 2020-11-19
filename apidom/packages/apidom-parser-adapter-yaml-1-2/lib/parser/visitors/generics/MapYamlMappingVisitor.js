"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramdaAdjunct = require("ramda-adjunct");

var _PatternedFieldsYamlMappingVisitor = _interopRequireDefault(require("./PatternedFieldsYamlMappingVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MapYamlMappingVisitor = (0, _stampit["default"])(_PatternedFieldsYamlMappingVisitor["default"], {
  props: {
    fieldPatternPredicate: _ramdaAdjunct.isNonEmptyString
  }
});
var _default = MapYamlMappingVisitor;
exports["default"] = _default;