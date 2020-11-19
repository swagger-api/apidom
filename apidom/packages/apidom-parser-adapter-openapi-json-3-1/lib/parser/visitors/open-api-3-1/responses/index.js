"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _predicates = require("../../../predicates");

var _MixedFieldsJsonObjectVisitor = _interopRequireDefault(require("../../generics/MixedFieldsJsonObjectVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ResponsesVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _MixedFieldsJsonObjectVisitor["default"], {
  props: {
    specPathFixedFields: (0, _ramda.always)(['document', 'objects', 'Responses']),
    specPathPatternedFields: function specPathPatternedFields(node) {
      /* eslint-disable no-nested-ternary */
      return (0, _predicates.isReferenceObject)({}, node) ? ['document', 'objects', 'Reference'] : (0, _predicates.isResponseObject)({}, node) ? ['document', 'objects', 'Response'] : ['value'];
      /* eslint-enable */
    },
    fieldPatternPredicate: (0, _ramda.test)(/^\d{3}$/),
    canSupportSpecificationExtensions: true
  },
  init: function init() {
    this.element = new this.namespace.elements.Responses();
  }
});
var _default = ResponsesVisitor;
exports["default"] = _default;