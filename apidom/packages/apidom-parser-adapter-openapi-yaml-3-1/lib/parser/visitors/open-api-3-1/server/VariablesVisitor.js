"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _generics = require("../../generics");

var _MapYamlMappingVisitor = _interopRequireDefault(require("../../generics/MapYamlMappingVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VariablesVisitor = (0, _stampit["default"])(_generics.KindVisitor, _MapYamlMappingVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'ServerVariable'])
  },
  init: function init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('variables');
  }
});
var _default = VariablesVisitor;
exports["default"] = _default;