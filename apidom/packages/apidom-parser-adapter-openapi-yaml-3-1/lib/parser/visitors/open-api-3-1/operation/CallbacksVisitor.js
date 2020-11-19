"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomAst = require("apidom-ast");

var _MapYamlMappingVisitor = _interopRequireDefault(require("../../generics/MapYamlMappingVisitor"));

var _predicates = require("../../../predicates");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallbacksVisitor = (0, _stampit["default"])(_generics.KindVisitor, _MapYamlMappingVisitor["default"], {
  props: {
    specPath: function specPath(node) {
      // eslint-disable-next-line no-nested-ternary
      return (0, _predicates.isReferenceObject)({}, node) ? ['document', 'objects', 'Reference'] : (0, _apidomAst.isYamlMapping)(node) ? ['document', 'objects', 'Callback'] : ['kind'];
    }
  },
  init: function init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('callbacks');
  }
});
var _default = CallbacksVisitor;
exports["default"] = _default;