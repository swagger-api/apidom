"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _MapJsonObjectVisitor = _interopRequireDefault(require("../../generics/MapJsonObjectVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SchemasVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _MapJsonObjectVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'Schema'])
  },
  init: function init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('schemas');
  }
});
var _default = SchemasVisitor;
exports["default"] = _default;