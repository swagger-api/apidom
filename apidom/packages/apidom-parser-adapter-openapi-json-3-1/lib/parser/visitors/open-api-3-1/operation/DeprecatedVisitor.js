"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DeprecatedVisitor = (0, _stampit["default"])(_generics.ValueVisitor);
var _default = DeprecatedVisitor;
exports["default"] = _default;