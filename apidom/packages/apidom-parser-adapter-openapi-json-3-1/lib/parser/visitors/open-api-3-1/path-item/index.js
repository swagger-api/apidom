"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _apidomNsOpenapi = require("apidom-ns-openapi-3-1");

var _FixedFieldsJsonObjectVisitor = _interopRequireDefault(require("../../generics/FixedFieldsJsonObjectVisitor"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PathItemVisitor = (0, _stampit["default"])(_generics.ValueVisitor, _FixedFieldsJsonObjectVisitor["default"], {
  props: {
    specPath: (0, _ramda.always)(['document', 'objects', 'PathItem'])
  },
  init: function init() {
    this.element = new this.namespace.elements.PathItem();
  },
  methods: {
    object: function object(objectNode) {
      var _this = this;

      // @ts-ignore
      var result = _FixedFieldsJsonObjectVisitor["default"].compose.methods.object.call(this, objectNode); // decorate Operation elements with HTTP method


      this.element.filter(_apidomNsOpenapi.isOperationElement).forEach(function (operationElement, httpMethodElementCI) {
        var httpMethod = httpMethodElementCI.toValue().toUpperCase();
        var httpMethodElementCS = new _this.namespace.elements.String(httpMethod);
        operationElement.setMetaProperty('httpMethod', httpMethodElementCS);
      });
      return result;
    }
  }
});
var _default = PathItemVisitor;
exports["default"] = _default;