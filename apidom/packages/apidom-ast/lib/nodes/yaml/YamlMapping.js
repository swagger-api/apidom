"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramdaAdjunct = require("ramda-adjunct");

var _YamlCollection = _interopRequireDefault(require("./YamlCollection"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlMapping = (0, _stampit["default"])(_YamlCollection["default"], {
  statics: {
    type: 'mapping'
  },
  methods: {
    get content() {
      return (0, _ramdaAdjunct.isArray)(this.children) ? this.children.filter(_predicates.isKeyValuePair) : [];
    }

  }
});
var _default = YamlMapping;
exports["default"] = _default;