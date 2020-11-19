"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _predicates = require("../../../predicates");

var _AlternatingVisitor = _interopRequireDefault(require("../../generics/AlternatingVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultVisitor = (0, _stampit["default"])(_AlternatingVisitor["default"], {
  props: {
    alternator: [{
      predicate: (0, _predicates.isReferenceObject)({}),
      specPath: ['document', 'objects', 'Reference']
    }, {
      predicate: (0, _predicates.isResponseObject)({}),
      specPath: ['document', 'objects', 'Response']
    }, {
      predicate: _ramda.T,
      specPath: ['value']
    }]
  }
});
var _default = DefaultVisitor;
exports["default"] = _default;