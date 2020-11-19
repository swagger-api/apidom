"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ProtocolVisitor = (0, _stampit["default"])(_generics.ValueVisitor);
var _default = ProtocolVisitor;
exports["default"] = _default;