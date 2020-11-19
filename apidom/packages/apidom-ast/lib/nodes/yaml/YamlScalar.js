"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _YamlNode = _interopRequireDefault(require("./YamlNode"));

var _YamlStyle = require("./YamlStyle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YamlScalar = (0, _stampit["default"])(_YamlNode["default"], {
  statics: {
    type: 'scalar'
  },
  props: {
    text: null
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$text = _ref.text,
        text = _ref$text === void 0 ? null : _ref$text,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? null : _ref$format;

    this.text = text;
    this.format = format;
  },
  methods: {
    // @ts-ignore
    get content() {
      if (this.style === _YamlStyle.YamlStyle.SingleQuoted) {
        // @ts-ignore
        return this.text.replace(/^'/, '').replace(/'$/, '');
      } // @ts-ignore


      return this.text;
    }

  }
});
var _default = YamlScalar;
exports["default"] = _default;