"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _PatternedFieldsJsonObjectVisitor = _interopRequireDefault(require("../../generics/PatternedFieldsJsonObjectVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ServersVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _PatternedFieldsJsonObjectVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'Server']),
    fieldPatternPredicate: (0, _ramda.test)(/^[A-Za-z0-9_\\-]+$/)
  },
  init: function init() {
    this.element = new this.namespace.elements.Servers();
  }
});
var _default = ServersVisitor;
exports["default"] = _default;