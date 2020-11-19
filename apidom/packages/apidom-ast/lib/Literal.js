"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Literal = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'literal'
  },
  props: {
    value: null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? null : _ref$value;

    this.value = value;
  }
});
var _default = Literal;
exports["default"] = _default;