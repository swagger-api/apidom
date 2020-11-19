"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomAst = require("apidom-ast");

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var SecurityVisitor = (0, _stampit["default"])(_apidomParserAdapterJson.SpecificationVisitor, {
  init: function init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('security');
  },
  methods: {
    array: function array(arrayNode) {
      var _this = this;

      arrayNode.items.forEach(function (item) {
        if ((0, _apidomAst.isJsonObject)(item)) {
          var element = _this.nodeToElement(['document', 'objects', 'SecurityRequirement'], item);

          _this.element.push(element);
        } else {
          var _element = _this.nodeToElement(['value'], item);

          _this.element.push(_element);
        }
      });
      this.maybeAddSourceMap(arrayNode, this.element);
      return _apidomParserAdapterJson.BREAK;
    }
  }
});
var _default = SecurityVisitor;
exports["default"] = _default;