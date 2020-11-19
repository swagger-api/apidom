"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Node = _interopRequireDefault(require("../../Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlComment = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'comment'
  },
  props: {
    content: null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$content = _ref.content,
        content = _ref$content === void 0 ? null : _ref$content;

    this.content = content;
  }
});
var _default = YamlComment;
exports["default"] = _default;