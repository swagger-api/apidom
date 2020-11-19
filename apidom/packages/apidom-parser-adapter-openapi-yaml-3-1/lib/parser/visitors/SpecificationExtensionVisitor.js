"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _predicates = require("../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var SpecificationExtensionVisitor = (0, _stampit["default"])(_apidomParserAdapterYaml.SpecificationVisitor, {
  methods: {
    keyValuePair: function keyValuePair(keyValuePairNode) {
      var keyNode = keyValuePairNode.key;
      var valueNode = keyValuePairNode.value;
      var keyElement = new this.namespace.elements.String(keyNode.content);
      var MemberElement = this.namespace.elements.Element.prototype.MemberElement;
      var state = {
        namespace: this.namespace,
        sourceMap: this.sourceMap,
        specObj: this.specObj
      };
      var valueVisitor = this.retrieveVisitorInstance(['kind']); // @ts-ignore

      (0, _apidomParserAdapterYaml.visit)(valueNode, valueVisitor, {
        state: state
      });
      var memberElement = this.maybeAddSourceMap(keyValuePairNode, new MemberElement(this.maybeAddSourceMap(keyNode, keyElement), this.maybeAddSourceMap(valueNode, valueVisitor.element)));

      if ((0, _predicates.isOpenApiExtension)({}, keyValuePairNode)) {
        memberElement.classes.push('specificationExtension');
      }

      this.element = memberElement;
      return _apidomParserAdapterYaml.BREAK;
    }
  }
});
var _default = SpecificationExtensionVisitor;
exports["default"] = _default;