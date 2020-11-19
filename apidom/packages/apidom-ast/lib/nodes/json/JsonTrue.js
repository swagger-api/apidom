"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _JsonValue = _interopRequireDefault(require("./JsonValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsonTrue = (0, _stampit["default"])(_JsonValue["default"], {
  statics: {
    type: 'true'
  }
});
var _default = JsonTrue;
exports["default"] = _default;