"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _SpecificationVisitor = _interopRequireDefault(require("../SpecificationVisitor"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PatternedFieldsJsonObjectVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  props: {
    fieldPatternPredicate: _ramda.F,
    specPath: _ramdaAdjunct.noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: false,
    specificationExtensionPredicate: _ramda.F
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$specPath = _ref.specPath,
        specPath = _ref$specPath === void 0 ? this.specPath : _ref$specPath,
        _ref$ignoredFields = _ref.ignoredFields,
        ignoredFields = _ref$ignoredFields === void 0 ? this.ignoredFields : _ref$ignoredFields,
        _ref$canSupportSpecif = _ref.canSupportSpecificationExtensions,
        canSupportSpecificationExtensions = _ref$canSupportSpecif === void 0 ? this.canSupportSpecificationExtensions : _ref$canSupportSpecif,
        _ref$specificationExt = _ref.specificationExtensionPredicate,
        specificationExtensionPredicate = _ref$specificationExt === void 0 ? this.specificationExtensionPredicate : _ref$specificationExt;

    this.specPath = specPath;
    this.ignoredFields = ignoredFields;
    this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
    this.specificationExtensionPredicate = specificationExtensionPredicate;
  },
  methods: {
    object: function object(objectNode) {
      var _this = this;

      objectNode.properties.forEach(function (propertyNode) {
        var keyName = propertyNode.key.value;
        var MemberElement = _this.namespace.elements.Element.prototype.MemberElement;

        if (_this.canSupportSpecificationExtensions && _this.specificationExtensionPredicate(propertyNode)) {
          var visitor = _this.retrieveVisitorInstance(['document', 'extension']);

          (0, _.visit)(propertyNode, visitor);

          _this.element.content.push(visitor.element);
        } else if (!_this.ignoredFields.includes(keyName) && _this.fieldPatternPredicate(keyName)) {
          var specPath = _this.specPath(propertyNode.value);

          var _visitor = _this.retrieveVisitorInstance(specPath);

          var keyElement = new _this.namespace.elements.String(keyName);
          (0, _.visit)(propertyNode, _visitor);

          var memberElement = _this.maybeAddSourceMap(propertyNode, new MemberElement(_this.maybeAddSourceMap(propertyNode.key, keyElement), _visitor.element));

          memberElement.classes.push('patternedField');

          _this.element.content.push(memberElement);
        } else if (!_this.ignoredFields.includes(keyName)) {
          var _keyElement = new _this.namespace.elements.String(keyName);

          var _memberElement = _this.maybeAddSourceMap(propertyNode, new MemberElement(_this.maybeAddSourceMap(propertyNode.key, _keyElement), _this.nodeToElement(['value'], propertyNode.value)));

          _this.element.content.push(_memberElement);
        }
      });
      this.maybeAddSourceMap(objectNode, this.element);
      return _.BREAK;
    }
  }
});
var _default = PatternedFieldsJsonObjectVisitor;
exports["default"] = _default;