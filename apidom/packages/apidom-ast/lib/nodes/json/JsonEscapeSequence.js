"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _JsonValue = _interopRequireDefault(require("./JsonValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsonEscapeSequence = (0, _stampit["default"])(_JsonValue["default"], {
  statics: {
    type: 'escapeSequence'
  }
});
var _default = JsonEscapeSequence;
exports["default"] = _default;