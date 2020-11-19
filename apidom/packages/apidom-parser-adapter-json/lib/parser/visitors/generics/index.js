"use strict";

exports.__esModule = true;
exports.ValueVisitor = exports.ObjectVisitor = exports.ArrayVisitor = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _apidomAst = require("apidom-ast");

var _ = require("..");

var _SpecificationVisitor = _interopRequireDefault(require("../SpecificationVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ArrayVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"]).init(function ArrayVisitor() {
  var _this = this;

  // @ts-ignore
  var stack = []; // @ts-ignore

  this.object = function object(objectNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var objectVisitor = this.retrieveVisitorInstance(['object']);
    (0, _.visit)(objectNode, objectVisitor);
    var objectElement = objectVisitor.element;
    arrayElement.push(this.maybeAddSourceMap(objectNode, objectElement));
    return false;
  };

  this.string = function string(stringNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var valueVisitor = this.retrieveVisitorInstance(['value']);
    valueVisitor.string(stringNode);
    arrayElement.push(valueVisitor.element);
  };

  this.number = function number(numberNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var valueVisitor = this.retrieveVisitorInstance(['value']);
    valueVisitor.number(numberNode);
    arrayElement.push(valueVisitor.element);
  };

  this["true"] = function _true(trueNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var valueVisitor = this.retrieveVisitorInstance(['value']);
    valueVisitor["true"](trueNode);
    arrayElement.push(valueVisitor.element);
  };

  this["false"] = function _false(falseNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var valueVisitor = this.retrieveVisitorInstance(['value']);
    valueVisitor["false"](falseNode);
    arrayElement.push(valueVisitor.element);
  };

  this["null"] = function _null(nullNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var valueVisitor = this.retrieveVisitorInstance(['value']);
    valueVisitor["null"](nullNode);
    arrayElement.push(valueVisitor.element);
  };

  this.array = {
    enter: function enter(arrayNode) {
      var arrayElement = _this.maybeAddSourceMap(arrayNode, new _this.namespace.elements.Array());

      stack.push(arrayElement);

      if ((0, _ramdaAdjunct.isNotNull)(_this.element)) {
        _this.element.push(arrayElement);
      } else {
        _this.element = arrayElement;
      }
    },
    leave: function leave() {
      // @ts-ignore
      _this.element = stack.pop();
    }
  };
});
exports.ArrayVisitor = ArrayVisitor;
var ObjectVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"]).init(function ObjectVisitor() {
  var _this2 = this;

  // @ts-ignore
  var stack = [];
  this.specificationExtensionPredicate = _ramda.F;

  this.property = function property(propertyNode) {
    // @ts-ignore
    var objElement = (0, _ramda.last)(stack);
    var MemberElement = this.namespace.elements.Element.prototype.MemberElement;
    var keyElement = new this.namespace.elements.String(propertyNode.key.value);
    var valueElement; // object property value handling

    if ((0, _apidomAst.isJsonObject)(propertyNode.value)) {
      var objectVisitor = this.retrieveVisitorInstance(['object']);
      (0, _.visit)(propertyNode.value, objectVisitor);
      valueElement = objectVisitor.element;
    } else if ((0, _apidomAst.isJsonArray)(propertyNode.value)) {
      var arrayVisitor = this.retrieveVisitorInstance(['array']);
      (0, _.visit)(propertyNode.value, arrayVisitor);
      valueElement = arrayVisitor.element;
    } else if (propertyNode.key.value === '$ref' && (0, _apidomAst.isJsonString)(propertyNode.value)) {
      // $ref property key special handling
      // @ts-ignore
      valueElement = new this.namespace.elements.Ref(propertyNode.value.value); // @ts-ignore

      valueElement.path = propertyNode.value.value;
      objElement.classes.push('json-reference');
      objElement.classes.push('json-schema-reference');
    } else if (!this.specificationExtensionPredicate(propertyNode)) {
      // @ts-ignore
      valueElement = this.namespace.toElement(propertyNode.value.value);
    }

    if (this.specificationExtensionPredicate(propertyNode)) {
      objElement.content.push(this.nodeToElement(['document', 'extension'], propertyNode));
    } else {
      objElement.content.push(this.maybeAddSourceMap(propertyNode, new MemberElement(this.maybeAddSourceMap(propertyNode.key, keyElement), this.maybeAddSourceMap(propertyNode.value, valueElement))));
    }

    return false;
  };

  this.object = {
    enter: function enter(objectNode) {
      var objectElement = _this2.maybeAddSourceMap(objectNode, new _this2.namespace.elements.Object()); // @ts-ignore


      stack.push(objectElement);
    },
    leave: function leave() {
      // @ts-ignore
      _this2.element = stack.pop();
    }
  };
});
exports.ObjectVisitor = ObjectVisitor;
var ValueVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  methods: {
    array: function array(arrayNode) {
      var arrayVisitor = this.retrieveVisitorInstance(['array']);
      (0, _.visit)(arrayNode, arrayVisitor);
      this.element = arrayVisitor.element;
      return _.BREAK;
    },
    object: function object(objectNode) {
      var objectVisitor = this.retrieveVisitorInstance(['object']);
      (0, _.visit)(objectNode, objectVisitor);
      this.element = objectVisitor.element;
      return _.BREAK;
    },
    string: function string(stringNode) {
      var stringElement = new this.namespace.elements.String(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, stringElement);
      return _.BREAK;
    },
    number: function number(numberNode) {
      var numberElement = new this.namespace.elements.Number(Number(numberNode.value));
      this.element = this.maybeAddSourceMap(numberNode, numberElement);
      return _.BREAK;
    },
    "true": function _true(trueNode) {
      var booleanElement = new this.namespace.elements.Boolean(true);
      this.element = this.maybeAddSourceMap(trueNode, booleanElement);
      return _.BREAK;
    },
    "false": function _false(falseNode) {
      var booleanElement = new this.namespace.elements.Boolean(false);
      this.element = this.maybeAddSourceMap(falseNode, booleanElement);
      return _.BREAK;
    },
    "null": function _null(nullNode) {
      var nullElement = new this.namespace.elements.Null();
      this.element = this.maybeAddSourceMap(nullNode, nullElement);
      return _.BREAK;
    }
  }
});
exports.ValueVisitor = ValueVisitor;