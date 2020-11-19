"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _predicates = require("../../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var PatternedFieldsJsonObjectVisitor = (0, _stampit["default"])(_apidomParserAdapterJson.PatternedFieldsJsonObjectVisitor, {
  props: {
    specificationExtensionPredicate: (0, _predicates.isAsyncApiExtension)({})
  }
});
var _default = PatternedFieldsJsonObjectVisitor;
exports["default"] = _default;