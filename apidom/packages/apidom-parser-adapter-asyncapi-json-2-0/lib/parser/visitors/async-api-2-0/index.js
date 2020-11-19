"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _generics = require("../generics");

var _FixedFieldsJsonObjectVisitor = _interopRequireDefault(require("../generics/FixedFieldsJsonObjectVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AsyncApi2_0Visitor = (0, _stampit["default"])(_generics.ValueVisitor, _FixedFieldsJsonObjectVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'AsyncApi'])
  },
  init: function init() {
    this.element = new this.namespace.elements.AsyncApi2_0();
  }
});
var _default = AsyncApi2_0Visitor;
exports["default"] = _default;