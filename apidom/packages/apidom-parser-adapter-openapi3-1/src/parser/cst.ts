import stampit from 'stampit';
import { tail } from 'ramda';
import { isFalse } from 'ramda-adjunct';
import Parser, { SyntaxNode } from 'tree-sitter';
import {
  JsonArray,
  JsonDocument,
  JsonFalse,
  JsonNull,
  JsonNumber,
  JsonObject,
  JsonKey,
  JsonProperty,
  JsonString,
  JsonStringContent,
  JsonEscapeSequence,
  JsonTrue,
  ParseResult,
  Point,
  Position,
  Literal,
  Error,
  visit,
} from 'apidom-ast';

export const keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children'],
};

const Visitor = stampit({
  init() {
    /**
     * Private API.
     */

    const toPosition = (node: SyntaxNode | null): Position | null => {
      if (node === null) {
        return null;
      }

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

    this.enter = function enter(node: SyntaxNode) {
      // missing anonymous literals from CST transformed into AST literal nodes
      if (isFalse(node.isNamed)) {
        const position = toPosition(node);
        const value = node.type || node.text;
        const isMissing = node.isMissing();

        return Literal({ value, position, isMissing });
      }

      return undefined;
    };

    this.document = function document(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonDocument({
        children: node.children,
        position,
        isMissing: node.isMissing(),
      });
    };

    this.object = function object(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonObject({ children: node.children, position, isMissing: node.isMissing() });
    };

    this.pair = function pair(node: SyntaxNode) {
      const position = toPosition(node);
      const children = tail<Parser.SyntaxNode | JsonKey>(node.children);
      const keyValuePairNodeCount = 3;

      if (node.childCount >= keyValuePairNodeCount && node.firstChild !== null) {
        const key = JsonKey({
          children: node.firstChild.children,
          position: toPosition(node.firstChild),
          isMissing: node.firstChild.isMissing(),
        });

        children.unshift(key);
      }

      return JsonProperty({ children, position, isMissing: node.isMissing() });
    };

    this.array = function array(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonArray({ children: node.children, position, isMissing: node.isMissing() });
    };

    this.string = function string(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonString({ children: node.children, position, isMissing: node.isMissing() });
    };

    this.string_content = function string_content(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonStringContent({ value: node.text, position, isMissing: node.isMissing() });
    };

    this.escape_sequence = function escape_sequence(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonEscapeSequence({ value: node.text, position, isMissing: node.isMissing() });
    };

    this.number = function number(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNumber({ value, position, isMissing: node.isMissing() });
    };

    this.null = function _null(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNull({ value, position, isMissing: node.isMissing() });
    };

    this.true = function _true(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonTrue({ value, position, isMissing: node.isMissing() });
    };

    this.false = function _false(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonFalse({ value, position, isMissing: node.isMissing() });
    };

    this.ERROR = function ERROR(node: SyntaxNode) {
      const position = toPosition(node);

      return Error({
        children: node.children,
        position,
        isUnexpected: !node.hasError(),
        isMissing: node.isMissing(),
        value: node.text,
      });
    };
  },
});

export const transform = (cst: Parser.Tree): ParseResult => {
  const visitor = Visitor();
  // @ts-ignore
  const rootNode = visit(cst.rootNode, visitor, { keyMap });

  return ParseResult({ children: [rootNode] });
};
