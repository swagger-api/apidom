"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports.transform = exports.keyMap = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _YamlDirective = _interopRequireDefault(require("../nodes/yaml/YamlDirective"));

var _YamlStream = _interopRequireDefault(require("../nodes/yaml/YamlStream"));

var _YamlDocument = _interopRequireDefault(require("../nodes/yaml/YamlDocument"));

var _YamlSequence = _interopRequireDefault(require("../nodes/yaml/YamlSequence"));

var _YamlMapping = _interopRequireDefault(require("../nodes/yaml/YamlMapping"));

var _YamlKeyValuePair = _interopRequireDefault(require("../nodes/yaml/YamlKeyValuePair"));

var _YamlTag = _interopRequireWildcard(require("../nodes/yaml/YamlTag"));

var _YamlAnchor = _interopRequireDefault(require("../nodes/yaml/YamlAnchor"));

var _YamlScalar = _interopRequireDefault(require("../nodes/yaml/YamlScalar"));

var _YamlComment = _interopRequireDefault(require("../nodes/yaml/YamlComment"));

var _YamlStyle = require("../nodes/yaml/YamlStyle");

var _ParseResult = _interopRequireDefault(require("../ParseResult"));

var _Position = _interopRequireWildcard(require("../Position"));

var _Literal = _interopRequireDefault(require("../Literal"));

var _Error = _interopRequireDefault(require("../Error"));

var _visitor = require("../visitor");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var keyMap = {
  stream: ['children'],
  document: ['children'],
  mapping: ['children'],
  keyValuePair: ['children'],
  sequence: ['children'],
  error: ['children']
};
/* eslint-disable no-param-reassign */

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

    var kindNodeToYamlTag = function kindNodeToYamlTag(node) {
      var previousSibling = node.previousSibling;

      while (previousSibling !== null && previousSibling.type !== 'tag') {
        var _previousSibling = previousSibling;
        previousSibling = _previousSibling.previousSibling;
      }

      if (previousSibling === null) {
        return null;
      } // eslint-disable-next-line no-nested-ternary


      var kind = node.type.endsWith('mapping') ? _YamlTag.YamlNodeKind.Mapping : node.type.endsWith('sequence') ? _YamlTag.YamlNodeKind.Sequence : _YamlTag.YamlNodeKind.Scalar;
      var position = toPosition(previousSibling);
      return (0, _YamlTag["default"])({
        name: previousSibling.text,
        kind: kind,
        position: position
      });
    };

    var kindNodeToYamlAnchor = function kindNodeToYamlAnchor(node) {
      var previousSibling = node.previousSibling;

      while (previousSibling !== null && previousSibling.type !== 'anchor') {
        var _previousSibling2 = previousSibling;
        previousSibling = _previousSibling2.previousSibling;
      }

      if (previousSibling === null) {
        return null;
      }

      return (0, _YamlAnchor["default"])({
        name: previousSibling.text,
        position: toPosition(previousSibling)
      });
    };

    var isKind = (0, _ramda.curry)(function (ending, node) {
      return (0, _ramda.propSatisfies)((0, _ramda.endsWith)(ending), 'type', node);
    });
    var isScalar = isKind('scalar');
    var isMapping = isKind('mapping');
    var isSequence = isKind('sequence');

    var isValuelessKeyValuePair = function isValuelessKeyValuePair(node) {
      if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
        return false;
      } // key value was not explicitly provided; tag and anchor are missing too
      // @ts-ignore


      if (node.valueNode === null) {
        return true;
      } // key value was not explicitly provided; tag or anchor are provided though
      // @ts-ignore


      return !node.valueNode.children.some((0, _ramda.anyPass)([isScalar, isSequence, isMapping]));
    };

    var createKeyValuePairSurrogateValue = function createKeyValuePairSurrogateValue(node) {
      var surrogatePoint = (0, _Position.Point)({
        row: node.endPosition.row,
        column: node.endPosition.column,
        "char": node.endIndex
      });
      var children = (0, _ramda.pathOr)([], ['valueNode', 'children'], node);
      var tagNode = (0, _ramda.find)(isKind('tag'), children);
      var anchorNode = (0, _ramda.find)(isKind('anchor'), children);
      var tag = null;
      var anchor = null;

      if (tagNode !== undefined) {
        tag = (0, _YamlTag["default"])({
          name: tagNode.text,
          kind: _YamlTag.YamlNodeKind.Scalar,
          position: toPosition(tagNode)
        });
      }

      if (anchorNode !== undefined) {
        anchor = (0, _YamlAnchor["default"])({
          name: anchorNode.text,
          position: toPosition(anchorNode)
        });
      }

      return (0, _YamlScalar["default"])({
        text: '',
        position: (0, _Position["default"])({
          start: surrogatePoint,
          end: surrogatePoint
        }),
        tag: tag,
        anchor: anchor,
        styleGroup: _YamlStyle.YamlStyleGroup.Flow,
        style: _YamlStyle.YamlStyle.Plain
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

    this.stream = {
      enter: function enter(node) {
        var position = toPosition(node);
        return (0, _YamlStream["default"])({
          children: node.children,
          position: position,
          isMissing: node.isMissing()
        });
      }
    };
    this.yaml_directive = {
      enter: function enter(node) {
        var position = toPosition(node);
        var version = (0, _ramda.pathOr)(null, ['firstNamedChild', 'text'], node);
        return (0, _YamlDirective["default"])({
          position: position,
          name: '%YAML',
          parameters: {
            version: version
          }
        });
      }
    };
    this.tag_directive = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tagHandleNode = node.child(0);
        var tagPrefixNode = node.child(1);
        return (0, _YamlDirective["default"])({
          position: position,
          name: '%TAG',
          parameters: {
            handle: (0, _ramda.propOr)(null, 'text', tagHandleNode),
            prefix: (0, _ramda.propOr)(null, 'text', tagPrefixNode)
          }
        });
      }
    };
    this.reserved_directive = {
      enter: function enter(node) {
        var position = toPosition(node);
        var directiveNameNode = node.child(0);
        var directiveParameter1Node = node.child(1);
        var directiveParameter2Node = node.child(2);
        return (0, _YamlDirective["default"])({
          position: position,
          name: (0, _ramda.propOr)(null, 'text', directiveNameNode),
          parameters: {
            handle: (0, _ramda.propOr)(null, 'text', directiveParameter1Node),
            prefix: (0, _ramda.propOr)(null, 'text', directiveParameter2Node)
          }
        });
      }
    };
    this.document = {
      enter: function enter(node) {
        var position = toPosition(node);
        return (0, _YamlDocument["default"])({
          children: node.children,
          position: position,
          isMissing: node.isMissing()
        });
      },
      leave: function leave(node) {
        node.children = (0, _ramda.unnest)(node.children);
      }
    };
    this.block_node = {
      enter: function enter(node) {
        return node.children;
      }
    };
    this.flow_node = {
      enter: function enter(node) {
        return node.children;
      }
    };
    this.tag = {
      enter: function enter() {
        return null;
      }
    };
    this.anchor = {
      enter: function enter() {
        return null;
      }
    };
    this.block_mapping = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node);
        return (0, _YamlMapping["default"])({
          children: node.children,
          position: position,
          anchor: anchor,
          tag: tag,
          styleGroup: _YamlStyle.YamlStyleGroup.Block,
          style: _YamlStyle.YamlStyle.NextLine,
          isMissing: node.isMissing()
        });
      }
    };
    this.block_mapping_pair = {
      enter: function enter(node) {
        var position = toPosition(node);

        var children = _toConsumableArray(node.children);

        if (isValuelessKeyValuePair(node)) {
          var valueNode = createKeyValuePairSurrogateValue(node);
          children.push(valueNode);
        }

        return (0, _YamlKeyValuePair["default"])({
          children: children,
          position: position,
          styleGroup: _YamlStyle.YamlStyleGroup.Block,
          isMissing: node.isMissing()
        });
      }
    };
    this.flow_mapping = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node);
        return (0, _YamlMapping["default"])({
          children: node.children,
          position: position,
          anchor: anchor,
          tag: tag,
          styleGroup: _YamlStyle.YamlStyleGroup.Flow,
          style: _YamlStyle.YamlStyle.Explicit,
          isMissing: node.isMissing()
        });
      }
    };
    this.flow_pair = {
      enter: function enter(node) {
        var position = toPosition(node);

        var children = _toConsumableArray(node.children);

        if (isValuelessKeyValuePair(node)) {
          var valueNode = createKeyValuePairSurrogateValue(node);
          children.push(valueNode);
        }

        return (0, _YamlKeyValuePair["default"])({
          children: children,
          position: position,
          styleGroup: _YamlStyle.YamlStyleGroup.Flow,
          isMissing: node.isMissing()
        });
      }
    };
    this.keyValuePair = {
      leave: function leave(node) {
        node.children = (0, _ramda.unnest)(node.children);
      }
    };
    this.block_sequence = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node);
        return (0, _YamlSequence["default"])({
          children: node.children,
          position: position,
          anchor: anchor,
          tag: tag,
          styleGroup: _YamlStyle.YamlStyleGroup.Block,
          style: _YamlStyle.YamlStyle.NextLine
        });
      }
    };
    this.block_sequence_item = {
      enter: function enter(node) {
        return node.children;
      }
    };
    this.flow_sequence = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node);
        return (0, _YamlSequence["default"])({
          children: (0, _ramda.unnest)(node.children),
          position: position,
          anchor: anchor,
          tag: tag,
          styleGroup: _YamlStyle.YamlStyleGroup.Flow,
          style: _YamlStyle.YamlStyle.Explicit
        });
      }
    };
    this.sequence = {
      leave: function leave(node) {
        node.children = (0, _ramda.flatten)(node.children);
      }
    };
    this.plain_scalar = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node);
        return (0, _YamlScalar["default"])({
          text: node.text,
          anchor: anchor,
          tag: tag,
          position: position,
          styleGroup: _YamlStyle.YamlStyleGroup.Flow,
          style: _YamlStyle.YamlStyle.Plain
        });
      }
    };
    this.single_quote_scalar = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node);
        return (0, _YamlScalar["default"])({
          text: node.text,
          anchor: anchor,
          tag: tag,
          position: position,
          styleGroup: _YamlStyle.YamlStyleGroup.Flow,
          style: _YamlStyle.YamlStyle.SingleQuoted
        });
      }
    };
    this.double_quote_scalar = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node);
        return (0, _YamlScalar["default"])({
          text: node.text,
          anchor: anchor,
          tag: tag,
          position: position,
          styleGroup: _YamlStyle.YamlStyleGroup.Flow,
          style: _YamlStyle.YamlStyle.DoubleQuoted
        });
      }
    };
    this.block_scalar = {
      enter: function enter(node) {
        var position = toPosition(node);
        var tag = kindNodeToYamlTag(node);
        var anchor = kindNodeToYamlAnchor(node); // eslint-disable-next-line no-nested-ternary

        var style = node.text.startsWith('|') ? _YamlStyle.YamlStyle.Literal : node.text.startsWith('>') ? _YamlStyle.YamlStyle.Folded : null;
        return (0, _YamlScalar["default"])({
          content: node.text,
          anchor: anchor,
          tag: tag,
          position: position,
          styleGroup: _YamlStyle.YamlStyleGroup.Block,
          style: style
        });
      }
    };
    this.comment = {
      enter: function enter(node) {
        return (0, _YamlComment["default"])({
          content: node.text
        });
      }
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
  var visitor = Visitor();
  var nodePredicate = (0, _ramda.either)(_ramdaAdjunct.isArray, _visitor.isNode); // @ts-ignore

  var rootNode = (0, _visitor.visit)(cst.rootNode, visitor, {
    keyMap: keyMap,
    nodePredicate: nodePredicate
  });
  return (0, _ParseResult["default"])({
    children: [rootNode]
  });
};

exports.transform = transform;