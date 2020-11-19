"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _MapJsonObjectVisitor = _interopRequireDefault(require("../../generics/MapJsonObjectVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SecurityRequirementVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _MapJsonObjectVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['array'])
  },
  init: function init() {
    this.element = new this.namespace.elements.SecurityRequirement();
  }
});
var _default = SecurityRequirementVisitor;
exports["default"] = _default;