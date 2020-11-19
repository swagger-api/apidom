"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _Node = _interopRequireDefault(require("../../Node"));

var _YamlStyle = _interopRequireDefault(require("./YamlStyle"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlKeyValuePair = (0, _stampit["default"])(_Node["default"], _YamlStyle["default"], {
  statics: {
    type: 'keyValuePair'
  },
  methods: {
    // @ts-ignore
    get key() {
      // @ts-ignore
      return (0, _ramda.pipe)((0, _ramda.filter)((0, _ramda.anyPass)([_predicates.isScalar, _predicates.isMapping, _predicates.isSequence])), (0, _ramda.nth)(0))(this.children);
    },

    // @ts-ignore
    get value() {
      var excludeKeyPredicate = (0, _ramda.complement)((0, _ramda.identical)(this.key));
      var valuePredicate = (0, _ramda.anyPass)([_predicates.isScalar, _predicates.isMapping, _predicates.isSequence, _predicates.isAlias]); // @ts-ignore

      return (0, _ramda.pipe)((0, _ramda.filter)((0, _ramda.both)(excludeKeyPredicate, valuePredicate)), (0, _ramda.nth)(0))(this.children);
    }

  }
});
var _default = YamlKeyValuePair;
exports["default"] = _default;