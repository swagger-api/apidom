"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _sourceMap = require("../source-map");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Visitor = (0, _stampit["default"])({
  props: {
    element: null,
    namespace: null,
    sourceMap: false
  },
  // @ts-ignore
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$namespace = _ref.namespace,
        namespace = _ref$namespace === void 0 ? this.namespace : _ref$namespace,
        _ref$sourceMap = _ref.sourceMap,
        sourceMap = _ref$sourceMap === void 0 ? this.sourceMap : _ref$sourceMap;

    this.namespace = namespace;
    this.sourceMap = sourceMap;
  },
  methods: {
    maybeAddSourceMap: function maybeAddSourceMap(node, element) {
      if (!this.sourceMap) {
        return element;
      }

      return (0, _sourceMap.addSourceMap)(node, element);
    }
  }
});
var _default = Visitor;
exports["default"] = _default;