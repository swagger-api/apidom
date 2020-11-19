"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Node = _interopRequireDefault(require("../../Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlDocument = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'document'
  }
});
var _default = YamlDocument;
exports["default"] = _default;