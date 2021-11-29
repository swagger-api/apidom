import { TreeCursor as NodeTreeCursor, Point as NodePoint } from 'tree-sitter';
import { TreeCursor as WebTreeCursor, Point as WebPoint } from 'web-tree-sitter';

type TreeCursor = NodeTreeCursor | WebTreeCursor;
type Point = NodePoint | WebPoint;

interface SyntaxNodeSurrogate {
  type: string;
  startPosition: Point;
  endPosition: Point;
  [key: string]: unknown;
}

class PreOrderCursorIterator {
  protected cursor;

  constructor(cursor: TreeCursor) {
    this.cursor = cursor;
  }

  protected createNode(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
    };
  }

  public *[Symbol.iterator]() {
    // @ts-ignore
    const method = this[this.cursor.nodeType];
    const constructor = this.constructor as any;

    yield (method || this.createNode).call(this) as SyntaxNodeSurrogate;

    if (this.cursor.gotoFirstChild()) {
      yield* new constructor(this.cursor);

      while (this.cursor.gotoNextSibling()) {
        yield* new constructor(this.cursor);
      }

      this.cursor.gotoParent();
    }
  }
}

export default PreOrderCursorIterator;
