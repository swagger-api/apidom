"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramdaAdjunct = require("ramda-adjunct");

var _ = require("..");

var _FixedFieldsJsonObjectVisitor = _interopRequireDefault(require("./FixedFieldsJsonObjectVisitor"));

var _PatternedFieldsJsonObjectVisitor = _interopRequireDefault(require("./PatternedFieldsJsonObjectVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MixedFieldsJsonObjectVisitor = (0, _stampit["default"])(_FixedFieldsJsonObjectVisitor["default"], _PatternedFieldsJsonObjectVisitor["default"], {
  props: {
    specPathFixedFields: _ramdaAdjunct.noop,
    specPathPatternedFields: _ramdaAdjunct.noop
  },
  methods: {
    object: function object(objectNode) {
      var specPath = this.specPath;

      try {
        this.specPath = this.specPathFixedFields; // @ts-ignore

        _FixedFieldsJsonObjectVisitor["default"].compose.methods.object.call(this, objectNode);

        this.specPath = this.specPathPatternedFields; // @ts-ignore

        _PatternedFieldsJsonObjectVisitor["default"].compose.methods.object.call(this, objectNode);
      } catch (e) {
        this.specPath = specPath;
        throw e;
      }

      return _.BREAK;
    }
  }
});
var _default = MixedFieldsJsonObjectVisitor;
exports["default"] = _default;