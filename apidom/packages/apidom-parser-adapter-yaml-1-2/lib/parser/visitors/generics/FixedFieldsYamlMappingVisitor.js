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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FixedFieldsYamlMappingVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  props: {
    specPath: _ramdaAdjunct.noop,
    ignoredFields: [],
    keyMap: _defineProperty({}, _apidomAst.YamlMapping.type, ['content']),
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
    mapping: function mapping(mappingNode) {
      this.maybeAddSourceMap(mappingNode, this.element);
    },
    keyValuePair: function keyValuePair(keyValuePairNode) {
      var specPath = this.specPath(keyValuePairNode);
      var fields = this.retrieveFixedFields(specPath);
      var MemberElement = this.namespace.elements.Element.prototype.MemberElement;
      var keyNode = keyValuePairNode.key,
          valueNode = keyValuePairNode.value;
      var keyName = keyNode.content;

      if (fields.includes(keyName) && !this.ignoredFields.includes(keyName)) {
        var visitor = this.retrieveVisitorInstance([].concat(_toConsumableArray(specPath), ['fixedFields', keyName]));
        var keyElement = new this.namespace.elements.String(keyName);
        (0, _.visit)(valueNode, visitor);
        var memberElement = this.maybeAddSourceMap(keyValuePairNode, new MemberElement(this.maybeAddSourceMap(keyNode, keyElement), visitor.element));
        memberElement.classes.push('fixedField');
        this.element.content.push(memberElement);
      } else if (this.canSupportSpecificationExtensions && this.specificationExtensionPredicate(keyValuePairNode)) {
        var _visitor = this.retrieveVisitorInstance(['document', 'extension']);

        (0, _.visit)(keyValuePairNode, _visitor);
        this.element.content.push(_visitor.element);
      } else if (!this.ignoredFields.includes(keyName)) {
        var _keyElement = new this.namespace.elements.String(keyName);

        var _memberElement = this.maybeAddSourceMap(keyValuePairNode, new MemberElement(this.maybeAddSourceMap(keyNode, _keyElement), this.nodeToElement(['kind'], valueNode)));

        this.element.content.push(_memberElement);
      }
    }
  }
});
var _default = FixedFieldsYamlMappingVisitor;
exports["default"] = _default;