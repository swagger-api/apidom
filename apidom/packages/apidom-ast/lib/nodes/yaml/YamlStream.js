"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _Node = _interopRequireDefault(require("../../Node"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlStream = (0, _stampit["default"])(_Node["default"], {
  statics: {
    type: 'stream'
  },
  methods: {
    get content() {
      return (0, _ramdaAdjunct.isArray)(this.children) ? this.children.filter((0, _ramda.either)(_predicates.isDocument, _predicates.isComment)) : [];
    }

  }
});
var _default = YamlStream;
exports["default"] = _default;