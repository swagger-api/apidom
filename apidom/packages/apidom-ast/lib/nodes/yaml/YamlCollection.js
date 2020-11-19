"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _YamlNode = _interopRequireDefault(require("./YamlNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlCollection = (0, _stampit["default"])(_YamlNode["default"], {});
var _default = YamlCollection;
exports["default"] = _default;