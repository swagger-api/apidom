"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _predicates = require("../../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var FixedFieldsJsonObjectVisitor = (0, _stampit["default"])(_apidomParserAdapterJson.FixedFieldsJsonObjectVisitor, {
  props: {
    specificationExtensionPredicate: (0, _predicates.isOpenApiExtension)({})
  }
});
var _default = FixedFieldsJsonObjectVisitor;
exports["default"] = _default;