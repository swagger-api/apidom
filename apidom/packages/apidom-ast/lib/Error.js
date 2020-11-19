"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Error = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'error'
  },
  props: {
    value: null,
    isUnexpected: false
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? null : _ref$value,
        _ref$isUnexpected = _ref.isUnexpected,
        isUnexpected = _ref$isUnexpected === void 0 ? false : _ref$isUnexpected;

    this.value = value;
    this.isUnexpected = isUnexpected;
  }
});
var _default = Error;
exports["default"] = _default;