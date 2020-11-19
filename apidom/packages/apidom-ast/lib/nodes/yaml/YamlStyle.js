"use strict";

exports.__esModule = true;
exports["default"] = exports.YamlStyleGroup = exports.YamlStyle = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlStyle;
exports.YamlStyle = YamlStyle;

(function (YamlStyle) {
  YamlStyle["Plain"] = "Plain";
  YamlStyle["SingleQuoted"] = "SingleQuoted";
  YamlStyle["DoubleQuoted"] = "DoubleQuoted";
  YamlStyle["Literal"] = "Literal";
  YamlStyle["Folded"] = "Folded";
  YamlStyle["Explicit"] = "Explicit";
  YamlStyle["SinglePair"] = "SinglePair";
  YamlStyle["NextLine"] = "NextLine";
  YamlStyle["InLine"] = "InLine";
})(YamlStyle || (exports.YamlStyle = YamlStyle = {}));

var YamlStyleGroup;
exports.YamlStyleGroup = YamlStyleGroup;

(function (YamlStyleGroup) {
  YamlStyleGroup["Flow"] = "Flow";
  YamlStyleGroup["Block"] = "Block";
})(YamlStyleGroup || (exports.YamlStyleGroup = YamlStyleGroup = {}));

var YamlStyleModel = (0, _stampit["default"])({
  props: {
    styleGroup: null,
    style: null
  }
});
var _default = YamlStyleModel;
exports["default"] = _default;