"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _PatternedFieldsYamlMappingVisitor = _interopRequireDefault(require("../../generics/PatternedFieldsYamlMappingVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ParametersVisitor = (0, _stampit["default"])(_generics.KindVisitor, _PatternedFieldsYamlMappingVisitor["default"], {
  props: {
    // TODO(vladimir.gorej@gmail.com): replace generic value spec with concrete objects
    specPath: (0, _ramda.always)(['kind']),
    fieldPatternPredicate: (0, _ramda.test)(/^[A-Za-z0-9_\\-]+$/)
  },
  init: function init() {
    this.element = new this.namespace.elements.Parameters();
  }
});
var _default = ParametersVisitor;
exports["default"] = _default;