"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _predicates = require("../../predicates");

var _generics = require("../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var ParametersVisitor = (0, _stampit["default"])(_generics.KindVisitor, _apidomParserAdapterYaml.SpecificationVisitor, {
  init: function init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('parameters');
  },
  methods: {
    sequence: function sequence(sequenceNode) {
      var _this = this;

      sequenceNode.content.forEach(function (item) {
        if ((0, _predicates.isParameterObject)({}, item)) {
          _this.element.push(new _this.namespace.elements.Parameter());
        } else if ((0, _predicates.isReferenceObject)({}, item)) {
          _this.element.push(new _this.namespace.elements.Reference());
        } else {
          var element = _this.nodeToElement(['kind'], item);

          _this.element.push(element);
        }
      });
      this.maybeAddSourceMap(sequenceNode, this.element);
      return _apidomParserAdapterYaml.BREAK;
    }
  }
});
var _default = ParametersVisitor;
exports["default"] = _default;