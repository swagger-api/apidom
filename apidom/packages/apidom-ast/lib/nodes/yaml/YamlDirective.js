"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _Node = _interopRequireDefault(require("../../Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlDirective = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'directive'
  },
  props: {
    name: null,
    parameters: null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? null : _ref$name,
        _ref$parameters = _ref.parameters,
        parameters = _ref$parameters === void 0 ? {} : _ref$parameters;

    this.name = name;
    this.parameters = (0, _ramda.mergeRight)({
      version: null,
      handle: null,
      prefix: null
    }, parameters);
  }
});
var _default = YamlDirective;
exports["default"] = _default;