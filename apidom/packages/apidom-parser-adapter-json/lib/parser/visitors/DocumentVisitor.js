"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _SpecificationVisitor = _interopRequireDefault(require("./SpecificationVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DocumentVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  methods: {
    literal: function literal(literalNode) {
      if (literalNode.isMissing) {
        var element = this.nodeToElement(['error'], literalNode);
        this.element.content.push(element);
      }
    },
    document: function document(documentNode) {
      var element = this.nodeToElement(['value'], documentNode);
      this.element.content.push(element);
    },
    error: function error(errorNode) {
      var element = this.nodeToElement(['error'], errorNode);
      this.element.content.push(element);
    }
  }
});
var _default = DocumentVisitor;
exports["default"] = _default;