"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomAst = require("apidom-ast");

var _MapJsonObjectVisitor = _interopRequireDefault(require("../../generics/MapJsonObjectVisitor"));

var _predicates = require("../../../predicates");

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallbacksVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _MapJsonObjectVisitor["default"], {
  props: {
    specPath: function specPath(node) {
      // eslint-disable-next-line no-nested-ternary
      return (0, _predicates.isReferenceObject)({}, node) ? ['document', 'objects', 'Reference'] : (0, _apidomAst.isJsonObject)(node) ? ['document', 'objects', 'Callback'] : ['value'];
    }
  },
  init: function init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('callbacks');
  }
});
var _default = CallbacksVisitor;
exports["default"] = _default;