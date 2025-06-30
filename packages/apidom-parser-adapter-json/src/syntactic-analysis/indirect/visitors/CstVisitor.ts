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
import type { JsonValueOptions } from '@swagger-api/apidom-ast';
import { assignSourceMap } from '@swagger-api/apidom-core';

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
      return new JsonDocument(
        assignSourceMap({ children: node.children, isMissing: node.isMissing }, node),
      );
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

      return new Literal(assignSourceMap({ value, isMissing }, node));
    }

    return undefined;
  }

  public object(node: TreeCursorSyntaxNode): JsonObject {
    return new JsonObject(
      assignSourceMap({ children: node.children, isMissing: node.isMissing }, node),
    );
  }

  public pair(node: TreeCursorSyntaxNode): JsonProperty {
    const children = node.children.slice(1);
    const { keyNode } = node;
    const key = new JsonKey(
      assignSourceMap(
        {
          children: keyNode?.children || [],
          isMissing: keyNode != null ? keyNode.isMissing : false,
        },
        keyNode,
      ),
    );

    return new JsonProperty(
      assignSourceMap(
        {
          children: [key, ...children],
          isMissing: node.isMissing,
        },
        node,
      ),
    );
  }

  public array(node: TreeCursorSyntaxNode): JsonArray {
    return new JsonArray(
      assignSourceMap({ children: node.children, isMissing: node.isMissing }, node),
    );
  }

  public string(node: TreeCursorSyntaxNode): JsonString {
    const content = new JsonStringContent({ value: JSON.parse(node.text) });

    return new JsonString(
      assignSourceMap({ children: [content], isMissing: node.isMissing }, node),
    );
  }

  public number(node: TreeCursorSyntaxNode): JsonNumber {
    const value = node.text;
    return new JsonNumber(
      assignSourceMap({ value, isMissing: node.isMissing }, node) as JsonValueOptions,
    );
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public null(node: TreeCursorSyntaxNode): JsonNull {
    const value = node.text;

    return new JsonNull(
      assignSourceMap({ value, isMissing: node.isMissing }, node) as JsonValueOptions,
    );
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public true(node: TreeCursorSyntaxNode): JsonTrue {
    const value = node.text;

    return new JsonTrue(
      assignSourceMap({ value, isMissing: node.isMissing }, node) as JsonValueOptions,
    );
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public false(node: TreeCursorSyntaxNode): JsonFalse {
    const value = node.text;

    return new JsonFalse(
      assignSourceMap({ value, isMissing: node.isMissing }, node) as JsonValueOptions,
    );
  }

  public ERROR(
    node: TreeCursorSyntaxNode,
    key: unknown,
    parent: unknown,
    path: string[],
  ): ParseResult | Error {
    const errorNode = new Error(
      assignSourceMap(
        {
          children: node.children,
          isUnexpected: !node.hasError,
          isMissing: node.isMissing,
          value: node.text,
        },
        node,
      ),
    );

    if (path.length === 0) {
      return new ParseResult({ children: [errorNode] });
    }

    return errorNode;
  }
}

export default CstVisitor;
