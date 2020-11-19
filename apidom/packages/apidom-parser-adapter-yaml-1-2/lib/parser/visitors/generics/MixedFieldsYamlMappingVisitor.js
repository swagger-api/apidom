"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramdaAdjunct = require("ramda-adjunct");

var _ = require("..");

var _FixedFieldsYamlMappingVisitor = _interopRequireDefault(require("./FixedFieldsYamlMappingVisitor"));

var _PatternedFieldsYamlMappingVisitor = _interopRequireDefault(require("./PatternedFieldsYamlMappingVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MixedFieldsYamlMappingVisitor = (0, _stampit["default"])(_FixedFieldsYamlMappingVisitor["default"], _PatternedFieldsYamlMappingVisitor["default"], {
  props: {
    specPathFixedFields: _ramdaAdjunct.noop,
    specPathPatternedFields: _ramdaAdjunct.noop
  },
  methods: {
    mapping: function mapping(mappingNode) {
      var fixedFieldsVisitor = (0, _FixedFieldsYamlMappingVisitor["default"])(_objectSpread(_objectSpread({}, this.retrievePassingOptions()), {}, {
        ignoredFields: this.ignoredFields,
        canSupportSpecificationExtensions: this.canSupportSpecificationExtensions,
        specificationExtensionPredicate: this.specificationExtensionPredicate,
        element: this.element,
        specPath: this.specPathFixedFields
      }));
      (0, _.visit)(mappingNode, fixedFieldsVisitor);
      var patternedFieldsVisitor = (0, _PatternedFieldsYamlMappingVisitor["default"])(_objectSpread(_objectSpread({}, this.retrievePassingOptions()), {}, {
        ignoredFields: this.ignoredFields,
        canSupportSpecificationExtensions: this.canSupportSpecificationExtensions,
        specificationExtensionPredicate: this.specificationExtensionPredicate,
        element: this.element,
        fieldPatternPredicate: this.fieldPatternPredicate,
        specPath: this.specPathPatternedFields
      }));
      (0, _.visit)(mappingNode, patternedFieldsVisitor);
      return _.BREAK;
    }
  }
});
var _default = MixedFieldsYamlMappingVisitor;
exports["default"] = _default;