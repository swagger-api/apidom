"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _YamlCollection = _interopRequireDefault(require("./YamlCollection"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlSequence = (0, _stampit["default"])(_YamlCollection["default"], {
  statics: {
    type: 'sequence'
  },
  methods: {
    get content() {
      return (0, _ramdaAdjunct.isArray)(this.children) ? this.children.filter((0, _ramda.anyPass)([_predicates.isSequence, _predicates.isMapping, _predicates.isScalar, _predicates.isAlias])) : [];
    }

  }
});
var _default = YamlSequence;
exports["default"] = _default;