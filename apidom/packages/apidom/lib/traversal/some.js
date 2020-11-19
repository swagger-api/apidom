"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _find = _interopRequireDefault(require("./find"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// tests whether at least one element passes the predicate
// some :: Pred -> Element -> Boolean
var some = (0, _ramda.curry)(function (predicate, element) {
  return (0, _ramdaAdjunct.isNotUndefined)((0, _find["default"])(predicate)(element));
});
var _default = some;
exports["default"] = _default;