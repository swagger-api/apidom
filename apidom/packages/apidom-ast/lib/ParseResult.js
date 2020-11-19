"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ParseResult = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'parseResult'
  },
  methods: {
    // @ts-ignore
    get rootNode() {
      // @ts-ignore
      return (0, _ramda.head)(this.children);
    }

  }
});
var _default = ParseResult;
exports["default"] = _default;