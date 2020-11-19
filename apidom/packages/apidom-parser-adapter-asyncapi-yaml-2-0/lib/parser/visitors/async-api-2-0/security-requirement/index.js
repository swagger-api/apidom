"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _MapYamlMappingVisitor = _interopRequireDefault(require("../../generics/MapYamlMappingVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SecurityRequirementVisitor = (0, _stampit["default"])(_generics.KindVisitor, _MapYamlMappingVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['sequence'])
  },
  init: function init() {
    this.element = new this.namespace.elements.SecurityRequirement();
  }
});
var _default = SecurityRequirementVisitor;
exports["default"] = _default;