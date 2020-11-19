"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports.transform = exports.keyMap = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _JsonArray = _interopRequireDefault(require("../nodes/json/JsonArray"));

var _JsonDocument = _interopRequireDefault(require("../nodes/json/JsonDocument"));

var _JsonFalse = _interopRequireDefault(require("../nodes/json/JsonFalse"));

var _JsonNull = _interopRequireDefault(require("../nodes/json/JsonNull"));

var _JsonNumber = _interopRequireDefault(require("../nodes/json/JsonNumber"));

var _JsonObject = _interopRequireDefault(require("../nodes/json/JsonObject"));

var _JsonKey = _interopRequireDefault(require("../nodes/json/JsonKey"));

var _JsonProperty = _interopRequireDefault(require("../nodes/json/JsonProperty"));

var _JsonString = _interopRequireDefault(require("../nodes/json/JsonString"));

var _JsonStringContent = _interopRequireDefault(require("../nodes/json/JsonStringContent"));

var _JsonEscapeSequence = _interopRequireDefault(require("../nodes/json/JsonEscapeSequence"));

var _JsonTrue = _interopRequireDefault(require("../nodes/json/JsonTrue"));

var _ParseResult = _interopRequireDefault(require("../ParseResult"));

var _Position = _interopRequireWildcard(require("../Position"));

var _Literal = _interopRequireDefault(require("../Literal"));

var _Error = _interopRequireDefault(require("../Error"));

var _visitor = require("../visitor");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children']
};
exports.keyMap = keyMap;
var Visitor = (0, _stampit["default"])({
  init: function init() {
    /**
     * Private API.
     */
    var toPosition = function toPosition(node) {
      if (node === null) {
        return null;
      }

      var start = (0, _Position.Point)({
        row: node.startPosition.row,
        column: node.startPosition.column,
        "char": node.startIndex
      });
      var end = (0, _Position.Point)({
        row: node.endPosition.row,
        column: node.endPosition.column,
        "char": node.endIndex
      });
      return (0, _Position["default"])({
        start: start,
        end: end
      });
    };
    /**
     * Public API.
     */


    this.enter = function enter(node) {
      // missing anonymous literals from CST transformed into AST literal nodes
      // WARNING: be aware that web-tree-sitter and tree-sitter node bindings have inconsistency
      // in `SyntaxNode.isNamed` property. web-tree-sitter has it defined as method
      // whether tree-sitter node binding has it defined as a boolean property.
      // @ts-ignore
      if ((0, _ramdaAdjunct.isFunction)(node.isNamed) && !node.isNamed() || (0, _ramdaAdjunct.isFalse)(node.isNamed)) {
        var position = toPosition(node);
        var value = node.type || node.text;
        var isMissing = node.isMissing();
        return (0, _Literal["default"])({
          value: value,
          position: position,
          isMissing: isMissing
        });
      }

      return undefined;
    };

    this.document = function document(node) {
      var position = toPosition(node);
      return (0, _JsonDocument["default"])({
        children: node.children,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.object = function object(node) {
      var position = toPosition(node);
      return (0, _JsonObject["default"])({
        children: node.children,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.pair = function pair(node) {
      var position = toPosition(node);
      var children = (0, _ramda.tail)(node.children);
      var keyValuePairNodeCount = 3;

      if (node.childCount >= keyValuePairNodeCount && node.firstChild !== null) {
        var key = (0, _JsonKey["default"])({
          children: node.firstChild.children,
          position: toPosition(node.firstChild),
          isMissing: node.firstChild.isMissing()
        });
        children.unshift(key);
      }

      return (0, _JsonProperty["default"])({
        children: children,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.array = function array(node) {
      var position = toPosition(node);
      return (0, _JsonArray["default"])({
        children: node.children,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.string = function string(node) {
      var position = toPosition(node);
      return (0, _JsonString["default"])({
        children: node.children,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.string_content = function string_content(node) {
      var position = toPosition(node);
      return (0, _JsonStringContent["default"])({
        value: node.text,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.escape_sequence = function escape_sequence(node) {
      var position = toPosition(node);
      return (0, _JsonEscapeSequence["default"])({
        value: node.text,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.number = function number(node) {
      var position = toPosition(node);
      var value = node.text;
      return (0, _JsonNumber["default"])({
        value: value,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this["null"] = function _null(node) {
      var position = toPosition(node);
      var value = node.text;
      return (0, _JsonNull["default"])({
        value: value,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this["true"] = function _true(node) {
      var position = toPosition(node);
      var value = node.text;
      return (0, _JsonTrue["default"])({
        value: value,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this["false"] = function _false(node) {
      var position = toPosition(node);
      var value = node.text;
      return (0, _JsonFalse["default"])({
        value: value,
        position: position,
        isMissing: node.isMissing()
      });
    };

    this.ERROR = function ERROR(node) {
      var position = toPosition(node);
      return (0, _Error["default"])({
        children: node.children,
        position: position,
        isUnexpected: !node.hasError(),
        isMissing: node.isMissing(),
        value: node.text
      });
    };
  }
});

var transform = function transform(cst) {
  var visitor = Visitor(); // @ts-ignore

  var rootNode = (0, _visitor.visit)(cst.rootNode, visitor, {
    keyMap: keyMap
  });
  return (0, _ParseResult["default"])({
    children: [rootNode]
  });
};

exports.transform = transform;