"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Node = _interopRequireDefault(require("../../Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlAnchor = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'anchor'
  },
  props: {
    name: null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? null : _ref$name;

    this.name = name;
  }
});
var _default = YamlAnchor;
exports["default"] = _default;