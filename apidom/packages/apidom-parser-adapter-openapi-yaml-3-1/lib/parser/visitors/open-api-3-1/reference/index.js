"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _FixedFieldsYamlMappingVisitor = _interopRequireDefault(require("../../generics/FixedFieldsYamlMappingVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ReferenceVisitor = (0, _stampit["default"])(_generics.KindVisitor, _FixedFieldsYamlMappingVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'Reference']),
    canSupportSpecificationExtensions: false
  },
  init: function init() {
    this.element = new this.namespace.elements.Reference();
  }
});
var _default = ReferenceVisitor;
exports["default"] = _default;