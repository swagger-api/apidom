import stampit from 'stampit';
import Parser, { SyntaxNode } from 'tree-sitter';
import {
  JsonArray,
  JsonDocument,
  JsonFalse,
  JsonNull,
  JsonNumber,
  JsonObject,
  JsonProperty,
  JsonString,
  JsonStringContent,
  JsonEscapeSequence,
  JsonTrue,
  ParseResult,
  Point,
  Position,
  Missing,
} from 'apidom-ast';

import { visit } from './visitor';

const keyMap = {
  document: ['child'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['key', 'value'],
};

const Visitor = stampit({
  props: {
    // we're collecting errors and annotations here into flat collection explicitly
    // to avoid full AST traversal just to get flat list of either errors or annotations
    errors: [],
    annotations: [],
  },
  init() {
    /**
     * Private API.
     */

    const toPosition = (node: SyntaxNode): Position => {
      const start = Point({
        row: node.startPosition.row,
        column: node.startPosition.column,
        char: node.startIndex,
      });
      const end = Point({
        row: node.endPosition.row,
        column: node.endPosition.column,
        char: node.endIndex,
      });

      return Position({ start, end });
    };

    /**
     * Public API.
     */

    this.errors = [];
    this.annotations = [];

    this.enter = function enter(node: SyntaxNode) {
      if (node.isMissing()) {
        const position = toPosition(node);
        const missingNode = Missing({ value: node.type, position });

        this.annotations.push(missingNode);

        return missingNode;
      }

      if (!node.isNamed) {
        return null;
      }

      return undefined;
    };

    this.document = function document(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonDocument({ child: node.firstChild, position });
    };

    this.object = function object(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonObject({ children: node.children, position });
    };

    this.pair = function pair(node: SyntaxNode) {
      const position = toPosition(node);
      const key = node.firstNamedChild;
      const value = node.lastNamedChild;

      return JsonProperty({ key, value, position });
    };

    this.array = function array(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonArray({ children: node.children, position });
    };

    this.string = function string(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonString({ children: node.children, position });
    };

    this.string_content = function string_content(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonStringContent({ value: node.text, position });
    };

    this.escape_sequence = function escape_sequence(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonEscapeSequence({ value: node.text, position });
    };

    this.number = function number(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNumber({ value, position });
    };

    this.null = function _null(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNull({ value, position });
    };

    this.true = function _true(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonTrue({ value, position });
    };

    this.false = function _false(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonFalse({ value, position });
    };
  },
});

// eslint-disable-next-line import/prefer-default-export
export const transform = (cst: Parser.Tree): ParseResult => {
  const visitor = Visitor();
  const rootNode = visit(cst.rootNode, visitor, { keyMap });
  const { errors, annotations } = visitor;

  return ParseResult({ rootNode, errors, annotations });
};
