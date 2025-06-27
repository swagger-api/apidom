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
  Literal,
  Error,
} from '@swagger-api/apidom-ast';

import TreeCursorSyntaxNode from '../../TreeCursorSyntaxNode.ts';

export const keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children'],
};

/* eslint-disable class-methods-use-this */

class CstVisitor {
  public readonly document = {
    enter: (node: TreeCursorSyntaxNode): JsonDocument => {
      return new JsonDocument({
        children: node.children,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        isMissing: node.isMissing,
      });
    },
    leave: (document: JsonDocument): ParseResult => {
      return new ParseResult({ children: [document] });
    },
  };

  public enter(node: TreeCursorSyntaxNode): Literal | undefined {
    // anonymous literals from CST transformed into AST literal nodes
    if (node instanceof TreeCursorSyntaxNode && !node.isNamed) {
      const value = node.type || node.text;
      const { isMissing } = node;

      return new Literal({
        value,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        isMissing,
      });
    }

    return undefined;
  }

  public object(node: TreeCursorSyntaxNode): JsonObject {
    return new JsonObject({
      children: node.children,
      // position,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  public pair(node: TreeCursorSyntaxNode): JsonProperty {
    const children = node.children.slice(1);
    const { keyNode } = node;
    const key = new JsonKey({
      children: keyNode?.children || [],
      startPositionRow: keyNode?.startPositionRow,
      startPositionColumn: keyNode?.startPositionColumn,
      startIndex: keyNode?.startIndex,
      endPositionRow: keyNode?.endPositionRow,
      endPositionColumn: keyNode?.endPositionColumn,
      endIndex: keyNode?.endIndex,
      isMissing: keyNode != null ? keyNode.isMissing : false,
    });

    return new JsonProperty({
      children: [key, ...children],
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  public array(node: TreeCursorSyntaxNode): JsonArray {
    return new JsonArray({
      children: node.children,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  public string(node: TreeCursorSyntaxNode): JsonString {
    const content = new JsonStringContent({ value: JSON.parse(node.text) });

    return new JsonString({
      children: [content],
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  public number(node: TreeCursorSyntaxNode): JsonNumber {
    const value = node.text;

    return new JsonNumber({
      value,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public null(node: TreeCursorSyntaxNode): JsonNull {
    const value = node.text;

    return new JsonNull({
      value,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public true(node: TreeCursorSyntaxNode): JsonTrue {
    const value = node.text;

    return new JsonTrue({
      value,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public false(node: TreeCursorSyntaxNode): JsonFalse {
    const value = node.text;

    return new JsonFalse({
      value,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isMissing: node.isMissing,
    });
  }

  public ERROR(
    node: TreeCursorSyntaxNode,
    key: unknown,
    parent: unknown,
    path: string[],
  ): ParseResult | Error {
    const errorNode = new Error({
      children: node.children,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isUnexpected: !node.hasError,
      isMissing: node.isMissing,
      value: node.text,
    });

    if (path.length === 0) {
      return new ParseResult({ children: [errorNode] });
    }

    return errorNode;
  }
}

export default CstVisitor;
