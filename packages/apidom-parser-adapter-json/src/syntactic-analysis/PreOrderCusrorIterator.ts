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
    let reachedRoot = false;

    while (!reachedRoot) {
      // @ts-ignore
      const method = this[this.cursor.nodeType];

      yield (method || this.createNode).call(this) as SyntaxNodeSurrogate;

      if (this.cursor.gotoFirstChild()) {
        continue; // eslint-disable-line no-continue
      }

      if (this.cursor.gotoNextSibling()) {
        continue; // eslint-disable-line no-continue
      }

      let retracting = true;
      while (retracting) {
        if (!this.cursor.gotoParent()) {
          retracting = false;
          reachedRoot = true;
        }

        if (this.cursor.gotoNextSibling()) {
          retracting = false;
        }
      }
    }
  }
}

export default PreOrderCursorIterator;
