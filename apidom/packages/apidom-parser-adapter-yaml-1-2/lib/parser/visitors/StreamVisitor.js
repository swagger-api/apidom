"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _apidomAst = require("apidom-ast");

var _ = require(".");

var _SpecificationVisitor = _interopRequireDefault(require("./SpecificationVisitor"));

var _keyMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StreamVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  props: {
    processedDocumentCount: 0,
    keyMap: (_keyMap = {}, _defineProperty(_keyMap, _apidomAst.YamlStream.type, ['children']), _defineProperty(_keyMap, _apidomAst.YamlDocument.type, ['children']), _defineProperty(_keyMap, _apidomAst.YamlMapping.type, ['children']), _defineProperty(_keyMap, _apidomAst.YamlSequence.type, ['children']), _defineProperty(_keyMap, _apidomAst.YamlKeyValuePair.type, ['children']), _defineProperty(_keyMap, _apidomAst.Error.type, ['children']), _keyMap)
  },
  methods: {
    literal: function literal(literalNode) {
      if (literalNode.isMissing) {
        var element = this.nodeToElement(['error'], literalNode);
        this.element.content.push(element);
      }
    },
    comment: function comment(commentNode) {
      // we're only interested of stream comments before the first document
      var shouldSkipVisitingMoreDocuments = this.processedDocumentCount >= 1;

      if (shouldSkipVisitingMoreDocuments) {
        return false;
      }

      var commentElement = new this.namespace.elements.Comment(commentNode.content);
      this.element.content.push(commentElement);
      return undefined;
    },
    document: function document(documentNode) {
      // we're only interested in first document
      var shouldWarnAboutMoreDocuments = this.processedDocumentCount === 1;
      var shouldSkipVisitingMoreDocuments = this.processedDocumentCount >= 1;

      if (shouldWarnAboutMoreDocuments) {
        var message = 'Only first document within YAML stream will be used. Rest will be discarded.';
        var annotationElement = new this.namespace.elements.Annotation(message);
        annotationElement.classes.push('warning');
        this.element.content.push(annotationElement);
      }

      if (shouldSkipVisitingMoreDocuments) {
        return _.BREAK;
      }

      var documentVisitor = this.retrieveVisitorInstance(['document']);
      (0, _.visit)(documentNode, documentVisitor, {
        // @ts-ignore
        state: {
          element: this.element
        }
      });
      this.processedDocumentCount += 1;
      return undefined;
    },
    error: function error(errorNode) {
      var element = this.nodeToElement(['error'], errorNode);
      this.element.content.push(element);
    }
  }
});
var _default = StreamVisitor;
exports["default"] = _default;