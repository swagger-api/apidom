"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _JsonNode = _interopRequireDefault(require("./JsonNode"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsonProperty = (0, _stampit["default"])(_JsonNode["default"], {
  statics: {
    type: 'property'
  },
  methods: {
    // @ts-ignore
    get key() {
      // @ts-ignore
      return this.children.find(_predicates.isKey);
    },

    // @ts-ignore
    get value() {
      // @ts-ignore
      return this.children.find((0, _ramda.anyPass)([_predicates.isFalse, _predicates.isTrue, _predicates.isNull, _predicates.isNumber, _predicates.isString, _predicates.isArray, _predicates.isObject]));
    }

  }
});
var _default = JsonProperty;
exports["default"] = _default;