"use strict";

exports.__esModule = true;
exports["default"] = exports.YamlNodeKind = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Node = _interopRequireDefault(require("../../Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlNodeKind;
exports.YamlNodeKind = YamlNodeKind;

(function (YamlNodeKind) {
  YamlNodeKind["Scalar"] = "Scalar";
  YamlNodeKind["Sequence"] = "Sequence";
  YamlNodeKind["Mapping"] = "Mapping";
})(YamlNodeKind || (exports.YamlNodeKind = YamlNodeKind = {}));

var YamlTag = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'tag'
  },
  props: {
    name: null,
    kind: null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? null : _ref$name,
        _ref$kind = _ref.kind,
        kind = _ref$kind === void 0 ? null : _ref$kind;

    this.name = name;
    this.kind = kind;
  }
});
var _default = YamlTag;
exports["default"] = _default;