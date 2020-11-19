"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomAst = require("apidom-ast");

var _SpecificationVisitor = _interopRequireDefault(require("./SpecificationVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DocumentVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  props: {
    keyMap: _defineProperty({}, _apidomAst.YamlDocument.type, ['children'])
  },
  methods: {
    scalar: function scalar(scalarNode) {
      var element = this.nodeToElement(['scalar'], scalarNode);
      this.element.content.push(element);
    },
    mapping: function mapping(mappingNode) {
      var element = this.nodeToElement(['mapping'], mappingNode);
      this.element.content.push(element);
    },
    sequence: function sequence(sequenceNode) {
      var arrayElement = this.nodeToElement(['sequence'], sequenceNode);
      this.element.content.push(arrayElement);
    },
    comment: function comment(commentNode) {
      var commentElement = new this.namespace.elements.Comment(commentNode.content);
      this.element.content.push(commentElement);
    }
  }
});
var _default = DocumentVisitor;
exports["default"] = _default;