"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ = require(".");

var _SpecificationVisitor = _interopRequireDefault(require("./SpecificationVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ErrorVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  methods: {
    literal: function literal(literalNode) {
      if (literalNode.isMissing) {
        var message = "(Missing ".concat(literalNode.value, ")");
        this.element = new this.namespace.elements.Annotation(message);
        this.maybeAddSourceMap(literalNode, this.element);
        return _.BREAK;
      }

      return undefined;
    },
    error: function error(errorNode) {
      var message = errorNode.isUnexpected ? "(Unexpected ".concat(errorNode.value, ")") : "(Error ".concat(errorNode.value, ")");
      this.element = new this.namespace.elements.Annotation(message);
      this.element.classes.push('error');
      this.maybeAddSourceMap(errorNode, this.element);
      return _.BREAK;
    }
  }
});
var _default = ErrorVisitor;
exports["default"] = _default;