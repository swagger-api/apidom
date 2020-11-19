"use strict";

exports.__esModule = true;
exports["default"] = exports.Point = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Point = (0, _stampit["default"])({
  statics: {
    type: 'point'
  },
  props: {
    type: 'point',
    row: null,
    column: null,
    "char": null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$row = _ref.row,
        row = _ref$row === void 0 ? null : _ref$row,
        _ref$column = _ref.column,
        column = _ref$column === void 0 ? null : _ref$column,
        _ref$char = _ref["char"],
        _char = _ref$char === void 0 ? null : _ref$char;

    this.row = row;
    this.column = column;
    this["char"] = _char;
  }
});
exports.Point = Point;
var Position = (0, _stampit["default"])({
  statics: {
    type: 'position'
  },
  props: {
    type: 'position',
    start: null,
    end: null
  },
  init: function init() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$start = _ref2.start,
        start = _ref2$start === void 0 ? null : _ref2$start,
        _ref2$end = _ref2.end,
        end = _ref2$end === void 0 ? null : _ref2$end;

    this.start = start;
    this.end = end;
  }
});
var _default = Position;
exports["default"] = _default;