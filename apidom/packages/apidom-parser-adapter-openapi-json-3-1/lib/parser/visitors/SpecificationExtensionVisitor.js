"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _predicates = require("../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var SpecificationExtensionVisitor = (0, _stampit["default"])(_apidomParserAdapterJson.SpecificationVisitor, {
  methods: {
    property: function property(propertyNode) {
      var keyElement = new this.namespace.elements.String(propertyNode.key.value);
      var MemberElement = this.namespace.elements.Element.prototype.MemberElement;
      var state = {
        namespace: this.namespace,
        sourceMap: this.sourceMap,
        specObj: this.specObj
      };
      var valueVisitor = this.retrieveVisitorInstance(['value']); // @ts-ignore

      (0, _apidomParserAdapterJson.visit)(propertyNode.value, valueVisitor, {
        state: state
      });
      var memberElement = this.maybeAddSourceMap(propertyNode, new MemberElement(this.maybeAddSourceMap(propertyNode.key, keyElement), this.maybeAddSourceMap(propertyNode.value, valueVisitor.element)));

      if ((0, _predicates.isOpenApiExtension)({}, propertyNode)) {
        memberElement.classes.push('specificationExtension');
      }

      this.element = memberElement;
      return _apidomParserAdapterJson.BREAK;
    }
  }
});
var _default = SpecificationExtensionVisitor;
exports["default"] = _default;