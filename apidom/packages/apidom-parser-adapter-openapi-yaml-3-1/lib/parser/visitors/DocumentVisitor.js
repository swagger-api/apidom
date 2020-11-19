"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var DocumentVisitor = (0, _stampit["default"])(_apidomParserAdapterYaml.DocumentVisitor, {
  methods: {
    mapping: function mapping(mappingNode) {
      var openApiElement = this.nodeToElement(['document', 'objects', 'OpenApi'], mappingNode);
      this.element.content.push(openApiElement);
    }
  }
});
var _default = DocumentVisitor;
exports["default"] = _default;