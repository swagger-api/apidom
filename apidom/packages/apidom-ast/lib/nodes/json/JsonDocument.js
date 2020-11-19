"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _JsonNode = _interopRequireDefault(require("./JsonNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsonDocument = (0, _stampit["default"])(_JsonNode["default"], {
  statics: {
    type: 'document'
  },
  methods: {
    // @ts-ignore
    get child() {
      // @ts-ignore
      return (0, _ramda.head)(this.children);
    }

  }
});
var _default = JsonDocument;
exports["default"] = _default;