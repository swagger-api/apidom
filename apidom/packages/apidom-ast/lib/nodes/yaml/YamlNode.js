"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Node = _interopRequireDefault(require("../../Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlNode = (0, _stampit["default"])(_Node["default"], {
  props: {
    anchor: null,
    tag: null,
    style: null,
    styleGroup: null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$anchor = _ref.anchor,
        anchor = _ref$anchor === void 0 ? null : _ref$anchor,
        _ref$tag = _ref.tag,
        tag = _ref$tag === void 0 ? null : _ref$tag,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? null : _ref$style,
        _ref$styleGroup = _ref.styleGroup,
        styleGroup = _ref$styleGroup === void 0 ? null : _ref$styleGroup;

    this.anchor = anchor;
    this.tag = tag;
    this.style = style;
    this.styleGroup = styleGroup;
  }
});
var _default = YamlNode;
exports["default"] = _default;