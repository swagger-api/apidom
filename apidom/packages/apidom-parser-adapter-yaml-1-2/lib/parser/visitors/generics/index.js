"use strict";

exports.__esModule = true;
exports.KindVisitor = exports.MappingVisitor = exports.SequenceVisitor = exports.ScalarVisitor = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _apidomAst = require("apidom-ast");

var _ = require("..");

var _SpecificationVisitor = _interopRequireDefault(require("../SpecificationVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ScalarVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  methods: {
    scalar: function scalar(scalarNode) {
      var stringElement = this.namespace.toElement(scalarNode.content);
      this.element = this.maybeAddSourceMap(scalarNode, stringElement);
      return _.BREAK;
    }
  }
});
exports.ScalarVisitor = ScalarVisitor;
var SequenceVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"]).init(function SequenceVisitor() {
  var _this = this;

  // @ts-ignore
  var stack = []; // @ts-ignore

  this.mapping = function mapping(mappingNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var element = this.nodeToElement(['mapping'], mappingNode);
    arrayElement.push(this.maybeAddSourceMap(mappingNode, element));
    return false;
  };

  this.sequence = {
    enter: function enter(sequenceNode) {
      var arrayElement = _this.maybeAddSourceMap(sequenceNode, new _this.namespace.elements.Array());

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

  this.scalar = function scalar(scalarNode) {
    // @ts-ignore
    var arrayElement = (0, _ramda.last)(stack);
    var element = this.nodeToElement(['scalar'], scalarNode);
    arrayElement.push(element);
  };
});
exports.SequenceVisitor = SequenceVisitor;
var MappingVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"]).init(function MappingVisitor() {
  var _this2 = this;

  // @ts-ignore
  var stack = [];
  this.specificationExtensionPredicate = _ramda.F;

  this.keyValuePair = function keyValuePair(keyValuePairNode) {
    // @ts-ignore
    var objElement = (0, _ramda.last)(stack);
    var MemberElement = this.namespace.elements.Element.prototype.MemberElement;
    var keyNode = keyValuePairNode.key;
    var valueNode = keyValuePairNode.value;
    var keyElement = new this.namespace.elements.String(keyNode.content);
    var valueElement;

    if ((0, _apidomAst.isYamlMapping)(valueNode)) {
      valueElement = this.nodeToElement(['mapping'], valueNode);
    } else if ((0, _apidomAst.isYamlSequence)(valueNode)) {
      valueElement = this.nodeToElement(['sequence'], valueNode);
    } else if (keyNode.content === '$ref') {
      // $ref property key special handling
      // @ts-ignore
      valueElement = new this.namespace.elements.Ref(valueNode.content);
      valueElement.path = valueNode.content;
      objElement.classes.push('json-reference');
      objElement.classes.push('json-schema-reference');
    } else if (!this.specificationExtensionPredicate(keyValuePairNode)) {
      // @ts-ignore
      valueElement = this.namespace.toElement(valueNode.content);
    }

    if (this.specificationExtensionPredicate(keyValuePairNode)) {
      objElement.content.push(this.nodeToElement(['document', 'extension'], keyValuePairNode));
    } else {
      objElement.content.push(this.maybeAddSourceMap(keyValuePairNode, new MemberElement(this.maybeAddSourceMap(keyNode, keyElement), this.maybeAddSourceMap(valueNode, valueElement))));
    }

    return false;
  };

  this.mapping = {
    enter: function enter(mappingNode) {
      var objectElement = _this2.maybeAddSourceMap(mappingNode, new _this2.namespace.elements.Object()); // @ts-ignore


      stack.push(objectElement);
    },
    leave: function leave() {
      // @ts-ignore
      _this2.element = stack.pop();
    }
  };
});
exports.MappingVisitor = MappingVisitor;
var KindVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  methods: {
    sequence: function sequence(sequenceNode) {
      this.element = this.nodeToElement(['sequence'], sequenceNode);
      return _.BREAK;
    },
    mapping: function mapping(mappingNode) {
      this.element = this.nodeToElement(['mapping'], mappingNode);
      return _.BREAK;
    },
    scalar: function scalar(scalarNode) {
      this.element = this.nodeToElement(['scalar'], scalarNode);
      return _.BREAK;
    }
  }
});
exports.KindVisitor = KindVisitor;