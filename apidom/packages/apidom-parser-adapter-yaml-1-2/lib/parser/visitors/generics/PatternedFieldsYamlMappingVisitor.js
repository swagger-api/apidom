"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _apidomAst = require("apidom-ast");

var _SpecificationVisitor = _interopRequireDefault(require("../SpecificationVisitor"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PatternedFieldsYamlMappingVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  props: {
    fieldPatternPredicate: _ramda.F,
    specPath: _ramdaAdjunct.noop,
    ignoredFields: [],
    keyMap: _defineProperty({}, _apidomAst.YamlMapping.type, ['content']),
    canSupportSpecificationExtensions: false,
    specificationExtensionPredicate: _ramda.F
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$specPath = _ref.specPath,
        specPath = _ref$specPath === void 0 ? this.specPath : _ref$specPath,
        _ref$fieldPatternPred = _ref.fieldPatternPredicate,
        fieldPatternPredicate = _ref$fieldPatternPred === void 0 ? this.fieldPatternPredicate : _ref$fieldPatternPred,
        _ref$ignoredFields = _ref.ignoredFields,
        ignoredFields = _ref$ignoredFields === void 0 ? this.ignoredFields : _ref$ignoredFields,
        _ref$canSupportSpecif = _ref.canSupportSpecificationExtensions,
        canSupportSpecificationExtensions = _ref$canSupportSpecif === void 0 ? this.canSupportSpecificationExtensions : _ref$canSupportSpecif,
        _ref$specificationExt = _ref.specificationExtensionPredicate,
        specificationExtensionPredicate = _ref$specificationExt === void 0 ? this.specificationExtensionPredicate : _ref$specificationExt;

    this.specPath = specPath;
    this.fieldPatternPredicate = fieldPatternPredicate;
    this.ignoredFields = ignoredFields;
    this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
    this.specificationExtensionPredicate = specificationExtensionPredicate;
  },
  methods: {
    mapping: function mapping(mappingNode) {
      this.maybeAddSourceMap(mappingNode, this.element);
    },
    keyValuePair: function keyValuePair(keyValuePairNode) {
      var keyNode = keyValuePairNode.key,
          valueNode = keyValuePairNode.value;
      var keyName = keyNode.content;
      var MemberElement = this.namespace.elements.Element.prototype.MemberElement;

      if (this.canSupportSpecificationExtensions && this.specificationExtensionPredicate(keyValuePairNode)) {
        var visitor = this.retrieveVisitorInstance(['document', 'extension']);
        (0, _.visit)(keyValuePairNode, visitor);
        this.element.content.push(visitor.element);
      } else if (!this.ignoredFields.includes(keyName) && this.fieldPatternPredicate(keyName)) {
        var specPath = this.specPath(valueNode);

        var _visitor = this.retrieveVisitorInstance(specPath);

        var keyElement = new this.namespace.elements.String(keyName);
        (0, _.visit)(valueNode, _visitor);
        var memberElement = this.maybeAddSourceMap(keyValuePairNode, new MemberElement(this.maybeAddSourceMap(keyNode, keyElement), _visitor.element));
        memberElement.classes.push('patternedField');
        this.element.content.push(memberElement);
      } else if (!this.ignoredFields.includes(keyName)) {
        var _keyElement = new this.namespace.elements.String(keyName);

        var _memberElement = this.maybeAddSourceMap(keyValuePairNode, new MemberElement(this.maybeAddSourceMap(keyNode, _keyElement), this.nodeToElement(['kind'], valueNode)));

        this.element.content.push(_memberElement);
      }
    }
  }
});
var _default = PatternedFieldsYamlMappingVisitor;
exports["default"] = _default;