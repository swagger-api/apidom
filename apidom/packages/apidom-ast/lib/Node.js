"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Node = (0, _stampit["default"])({
  props: {
    type: null,
    position: null,
    children: []
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        _ref$position = _ref.position,
        position = _ref$position === void 0 ? null : _ref$position,
        _ref$isMissing = _ref.isMissing,
        isMissing = _ref$isMissing === void 0 ? false : _ref$isMissing;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        stamp = _ref2.stamp;

    this.type = stamp.type;
    this.isMissing = isMissing;
    this.children = children;
    this.position = position;
  }
});
var _default = Node;
exports["default"] = _default;