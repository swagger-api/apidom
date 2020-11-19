"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _generics = require("../generics");

var _FixedFieldsJsonObjectVisitor = _interopRequireDefault(require("../generics/FixedFieldsJsonObjectVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OpenApi3_1Visitor = (0, _stampit["default"])(_generics.ValueVisitor, _FixedFieldsJsonObjectVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'OpenApi'])
  },
  init: function init() {
    this.element = new this.namespace.elements.OpenApi3_1();
  }
});
var _default = OpenApi3_1Visitor;
exports["default"] = _default;