"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _generics = require("../../generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SummaryVisitor = (0, _stampit["default"])(_generics.KindVisitor);
var _default = SummaryVisitor;
exports["default"] = _default;