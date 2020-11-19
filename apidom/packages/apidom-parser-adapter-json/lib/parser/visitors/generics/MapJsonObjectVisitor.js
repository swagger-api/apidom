"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramdaAdjunct = require("ramda-adjunct");

var _PatternedFieldsJsonObjectVisitor = _interopRequireDefault(require("./PatternedFieldsJsonObjectVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MapJsonObjectVisitor = (0, _stampit["default"])(_PatternedFieldsJsonObjectVisitor["default"], {
  props: {
    fieldPatternPredicate: _ramdaAdjunct.isNonEmptyString
  }
});
var _default = MapJsonObjectVisitor;
exports["default"] = _default;