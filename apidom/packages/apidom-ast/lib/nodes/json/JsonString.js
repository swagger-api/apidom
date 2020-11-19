"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _JsonNode = _interopRequireDefault(require("./JsonNode"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsonString = (0, _stampit["default"])(_JsonNode["default"], {
  statics: {
    type: 'string'
  },
  methods: {
    get value() {
      return this.children // @ts-ignore
      .filter((0, _ramda.either)(_predicates.isStringContent, _predicates.isEscapeSequence)).reduce(function (acc, cur) {
        return acc + cur.value;
      }, '');
    }

  }
});
var _default = JsonString;
exports["default"] = _default;