"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomAst = require("apidom-ast");

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var SecurityVisitor = (0, _stampit["default"])(_apidomParserAdapterYaml.SpecificationVisitor, {
  init: function init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('security');
  },
  methods: {
    sequence: function sequence(sequenceNode) {
      var _this = this;

      sequenceNode.content.forEach(function (item) {
        if ((0, _apidomAst.isYamlMapping)(item)) {
          var element = _this.nodeToElement(['document', 'objects', 'SecurityRequirement'], item);

          _this.element.push(element);
        } else {
          var _element = _this.nodeToElement(['kind'], item);

          _this.element.push(_element);
        }
      });
      this.maybeAddSourceMap(sequenceNode, this.element);
      return _apidomParserAdapterYaml.BREAK;
    }
  }
});
var _default = SecurityVisitor;
exports["default"] = _default;