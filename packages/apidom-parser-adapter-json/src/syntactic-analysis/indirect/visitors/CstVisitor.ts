import stampit from 'stampit';
import { SyntaxNode as NodeSyntaxNode } from 'tree-sitter';
import { SyntaxNode as WebSyntaxNode } from 'web-tree-sitter';
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

export const keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children'],
};

type SyntaxNode = WebSyntaxNode | NodeSyntaxNode;

const CstVisitor = stampit({
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

    const getFieldFromNode = (fieldName: string, node: SyntaxNode): SyntaxNode | null => {
      return `${fieldName}Node` in node
        ? // @ts-ignore
          node[`${fieldName}Node`]
        : 'childForFieldName' in node
        ? node.childForFieldName?.(fieldName)
        : null;
    };

    /**
     * Public API.
     */

    this.enter = function enter(node: SyntaxNode) {
      // missing anonymous literals from CST transformed into AST literal nodes
      // WARNING: be aware that web-tree-sitter and tree-sitter node bindings have inconsistency
      // in `SyntaxNode.isNamed` property. web-tree-sitter has it defined as method
      // whether tree-sitter node binding has it defined as a boolean property.
      // @ts-ignore
      if ((typeof node.isNamed === 'function' && !node.isNamed()) || node.isNamed === false) {
        const position = toPosition(node);
        const value = node.type || node.text;
        const isMissing = node.isMissing();

        return Literal({ value, position, isMissing });
      }

      return undefined;
    };

    this.document = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);

        return JsonDocument({
          children: node.children,
          position,
          isMissing: node.isMissing(),
        });
      },
      leave(document: JsonDocument) {
        return ParseResult({ children: [document] });
      },
    };

    this.object = function object(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonObject({ children: node.children, position, isMissing: node.isMissing() });
    };

    this.pair = function pair(node: SyntaxNode) {
      const position = toPosition(node);
      const children = node.children.slice(1);
      const keyNode = getFieldFromNode('key', node);
      const key = JsonKey({
        children: keyNode?.children || [],
        position: toPosition(keyNode),
        isMissing: keyNode?.isMissing() || false,
      });

      return JsonProperty({ children: [key, ...children], position, isMissing: node.isMissing() });
    };

    this.array = function array(node: SyntaxNode) {
      const position = toPosition(node);

      return JsonArray({ children: node.children, position, isMissing: node.isMissing() });
    };

    this.string = function string(node: SyntaxNode) {
      const position = toPosition(node);
      const content = JsonStringContent({ value: node.text.slice(1, -1) });

      return JsonString({ children: [content], position, isMissing: node.isMissing() });
    };

    this.number = function number(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNumber({ value, position, isMissing: node.isMissing() });
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.null = function _null(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonNull({ value, position, isMissing: node.isMissing() });
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.true = function _true(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonTrue({ value, position, isMissing: node.isMissing() });
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.false = function _false(node: SyntaxNode) {
      const position = toPosition(node);
      const value = node.text;

      return JsonFalse({ value, position, isMissing: node.isMissing() });
    };

    this.ERROR = function ERROR(node: SyntaxNode, key: any, parent: any, path: string[]) {
      const position = toPosition(node);
      const errorNode = Error({
        children: node.children,
        position,
        isUnexpected: !node.hasError(),
        isMissing: node.isMissing(),
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
