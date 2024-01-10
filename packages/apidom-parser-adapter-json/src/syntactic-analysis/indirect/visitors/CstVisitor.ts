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

class CstVisitor {
  /**
   * Private API.
   */

  // eslint-disable-next-line class-methods-use-this
  private toPosition(node: TreeCursorSyntaxNode): Position {
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
  }

  /**
   * Public API.
   */

  enter(node: TreeCursorSyntaxNode): Literal | undefined {
    // anonymous literals from CST transformed into AST literal nodes
    if (node instanceof TreeCursorSyntaxNode && !node.isNamed) {
      const position = this.toPosition(node);
      const value = node.type || node.text;
      const { isMissing } = node;

      return Literal({ value, position, isMissing });
    }

    return undefined;
  }

  document = {
    enter: (node: TreeCursorSyntaxNode): JsonDocument => {
      const position = this.toPosition(node);

      return JsonDocument({
        children: node.children,
        position,
        isMissing: node.isMissing,
      });
    },
    leave(document: JsonDocument): ParseResult {
      return ParseResult({ children: [document] });
    },
  };

  object(node: TreeCursorSyntaxNode): JsonObject {
    const position = this.toPosition(node);

    return JsonObject({ children: node.children, position, isMissing: node.isMissing });
  }

  pair(node: TreeCursorSyntaxNode): JsonProperty {
    const position = this.toPosition(node);
    const children = node.children.slice(1);
    const { keyNode } = node;
    const key = JsonKey({
      children: keyNode?.children || [],
      position: keyNode != null ? this.toPosition(keyNode) : null,
      isMissing: keyNode != null ? keyNode.isMissing : false,
    });

    return JsonProperty({ children: [key, ...children], position, isMissing: node.isMissing });
  }

  array(node: TreeCursorSyntaxNode): JsonArray {
    const position = this.toPosition(node);

    return JsonArray({ children: node.children, position, isMissing: node.isMissing });
  }

  string(node: TreeCursorSyntaxNode): JsonString {
    const position = this.toPosition(node);
    const content = JsonStringContent({ value: JSON.parse(node.text) });

    return JsonString({ children: [content], position, isMissing: node.isMissing });
  }

  number(node: TreeCursorSyntaxNode): JsonNumber {
    const position = this.toPosition(node);
    const value = node.text;

    return JsonNumber({ value, position, isMissing: node.isMissing });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  null(node: TreeCursorSyntaxNode): JsonNull {
    const position = this.toPosition(node);
    const value = node.text;

    return JsonNull({ value, position, isMissing: node.isMissing });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  true(node: TreeCursorSyntaxNode): JsonTrue {
    const position = this.toPosition(node);
    const value = node.text;

    return JsonTrue({ value, position, isMissing: node.isMissing });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  false(node: TreeCursorSyntaxNode): JsonFalse {
    const position = this.toPosition(node);
    const value = node.text;

    return JsonFalse({ value, position, isMissing: node.isMissing });
  }

  ERROR(
    node: TreeCursorSyntaxNode,
    key: unknown,
    parent: unknown,
    path: string[],
  ): ParseResult | Error {
    const position = this.toPosition(node);
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
  }
}

export default CstVisitor;
