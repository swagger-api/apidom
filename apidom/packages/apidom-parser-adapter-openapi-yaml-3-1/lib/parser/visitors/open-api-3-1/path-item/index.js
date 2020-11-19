"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _apidomNsOpenapi = require("apidom-ns-openapi-3-1");

var _FixedFieldsYamlMappingVisitor = _interopRequireDefault(require("../../generics/FixedFieldsYamlMappingVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PathItemVisitor = (0, _stampit["default"])(_generics.KindVisitor, _FixedFieldsYamlMappingVisitor["default"]).init(function PathItemVisitor() {
  this.element = new this.namespace.elements.PathItem();
  this.specPath = (0, _ramda.always)(['document', 'objects', 'PathItem']);
  this.mapping = {
    leave: function leave() {
      var _this = this;

      this.element.filter(_apidomNsOpenapi.isOperationElement).forEach(function (operationElement, httpMethodElementCI) {
        var httpMethod = httpMethodElementCI.toValue().toUpperCase();
        var httpMethodElementCS = new _this.namespace.elements.String(httpMethod);
        operationElement.setMetaProperty('httpMethod', httpMethodElementCS);
      });
    }
  };
});
var _default = PathItemVisitor;
exports["default"] = _default;