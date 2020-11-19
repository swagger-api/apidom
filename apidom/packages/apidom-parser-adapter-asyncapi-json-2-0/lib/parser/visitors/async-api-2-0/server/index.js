"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _FixedFieldsJsonObjectVisitor = _interopRequireDefault(require("../../generics/FixedFieldsJsonObjectVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ServerVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _FixedFieldsJsonObjectVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'Server'])
  },
  init: function init() {
    this.element = new this.namespace.elements.Server();
  }
});
var _default = ServerVisitor;
exports["default"] = _default;