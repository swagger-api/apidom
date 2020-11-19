"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _predicates = require("../../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var MixedFieldsJsonObjectVisitor = (0, _stampit["default"])(_apidomParserAdapterJson.MixedFieldsJsonObjectVisitor, {
  props: {
    specificationExtensionPredicate: (0, _predicates.isOpenApiExtension)({})
  }
});
var _default = MixedFieldsJsonObjectVisitor;
exports["default"] = _default;