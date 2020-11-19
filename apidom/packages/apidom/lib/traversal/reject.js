"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ramda = require("ramda");

var _filter = _interopRequireDefault(require("./filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// complement of filter
// reject :: Pred -> Element -> ArraySlice
var reject = (0, _ramda.curry)(function (predicate, element) {
  return (0, _filter["default"])((0, _ramda.complement)(predicate))(element);
});
var _default = reject;
exports["default"] = _default;