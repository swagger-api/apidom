"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _SpecificationVisitor = _interopRequireDefault(require("../SpecificationVisitor"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FixedFieldsJsonObjectVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  props: {
    specPath: _ramdaAdjunct.noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: true,
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

      var specPath = this.specPath(objectNode);
      var fields = this.retrieveFixedFields(specPath);
      var MemberElement = this.namespace.elements.Element.prototype.MemberElement;
      objectNode.properties.forEach(function (propertyNode) {
        var keyName = propertyNode.key.value;

        if (fields.includes(keyName) && !_this.ignoredFields.includes(keyName)) {
          var visitor = _this.retrieveVisitorInstance([].concat(_toConsumableArray(specPath), ['fixedFields', propertyNode.key.value]));

          var keyElement = new _this.namespace.elements.String(keyName);
          (0, _.visit)(propertyNode.value, visitor);

          var memberElement = _this.maybeAddSourceMap(propertyNode, new MemberElement(_this.maybeAddSourceMap(propertyNode.key, keyElement), visitor.element));

          memberElement.classes.push('fixedField');

          _this.element.content.push(memberElement);
        } else if (_this.canSupportSpecificationExtensions && _this.specificationExtensionPredicate(propertyNode)) {
          var _visitor = _this.retrieveVisitorInstance(['document', 'extension']);

          (0, _.visit)(propertyNode, _visitor);

          _this.element.content.push(_visitor.element);
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
var _default = FixedFieldsJsonObjectVisitor;
exports["default"] = _default;