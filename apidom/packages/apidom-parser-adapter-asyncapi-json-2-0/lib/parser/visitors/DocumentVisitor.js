"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomAst = require("apidom-ast");

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var DocumentVisitor = (0, _stampit["default"])(_apidomParserAdapterJson.DocumentVisitor, {
  methods: {
    document: function document(documentNode) {
      var specPath = (0, _apidomAst.isJsonObject)(documentNode.child) ? ['document', 'objects', 'AsyncApi'] : ['value'];
      var element = this.nodeToElement(specPath, documentNode);
      this.element.content.push(element);
    }
  }
});
var _default = DocumentVisitor;
exports["default"] = _default;