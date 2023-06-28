import stampit from 'stampit';
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
  JsonTrue,
  ParseResult,
  Position,
  Point,
  Literal,
  Error,
} from '@swagger-api/apidom-ast';

import TreeCursorSyntaxNode from '../../TreeCursorSyntaxNode';

export const keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children'],
};

const CstVisitor = stampit({
  init() {
    /**
     * Private API.
     */

    const toPosition = (node: TreeCursorSyntaxNode): Position => {
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

    this.enter = function enter(node: TreeCursorSyntaxNode) {
      // anonymous literals from CST transformed into AST literal nodes
      if (node instanceof TreeCursorSyntaxNode && !node.isNamed) {
        const position = toPosition(node);
        const value = node.type || node.text;
        const { isMissing } = node;

        return Literal({ value, position, isMissing });
      }

      return undefined;
    };

    this.document = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);

        return JsonDocument({
          children: node.children,
          position,
          isMissing: node.isMissing,
        });
      },
      leave(document: JsonDocument) {
        return ParseResult({ children: [document] });
      },
    };

    this.object = function object(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);

      return JsonObject({ children: node.children, position, isMissing: node.isMissing });
    };

    this.pair = function pair(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);
      const children = node.children.slice(1);
      const { keyNode } = node;
      const key = JsonKey({
        children: keyNode?.children || [],
        position: keyNode != null ? toPosition(keyNode) : null,
        isMissing: keyNode != null ? keyNode.isMissing : false,
      });

      return JsonProperty({ children: [key, ...children], position, isMissing: node.isMissing });
    };

    this.array = function array(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);

      return JsonArray({ children: node.children, position, isMissing: node.isMissing });
    };

    this.string = function string(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);
      const content = JsonStringContent({ value: JSON.parse(node.text) });

      return JsonString({ children: [content], position, isMissing: node.isMissing });
    };

    this.number = function number(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNumber({ value, position, isMissing: node.isMissing });
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.null = function _null(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNull({ value, position, isMissing: node.isMissing });
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.true = function _true(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonTrue({ value, position, isMissing: node.isMissing });
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.false = function _false(node: TreeCursorSyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonFalse({ value, position, isMissing: node.isMissing });
    };

    this.ERROR = function ERROR(node: TreeCursorSyntaxNode, key: any, parent: any, path: string[]) {
      const position = toPosition(node);
      const errorNode = Error({
        children: node.children,
        position,
        isUnexpected: !node.hasError,
        isMissing: node.isMissing,
        value: node.text,
      });

      if (path.length === 0) {
        return ParseResult({ children: [errorNode] });
      }

      return errorNode;
    };
  },
});

export default CstVisitor;
