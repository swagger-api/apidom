"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _JsonNode = _interopRequireDefault(require("./JsonNode"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsonObject = (0, _stampit["default"])(_JsonNode["default"], {
  statics: {
    type: 'object'
  },
  methods: {
    get properties() {
      // @ts-ignore
      return this.children.filter(_predicates.isProperty);
    }

  }
});
var _default = JsonObject;
exports["default"] = _default;