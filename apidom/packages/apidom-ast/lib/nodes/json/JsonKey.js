"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _JsonString = _interopRequireDefault(require("./JsonString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsonKey = (0, _stampit["default"])(_JsonString["default"], {
  statics: {
    type: 'key'
  }
});
var _default = JsonKey;
exports["default"] = _default;