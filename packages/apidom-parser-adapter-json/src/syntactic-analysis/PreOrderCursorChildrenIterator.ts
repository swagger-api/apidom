import { TreeCursor as NodeTreeCursor, Point as NodePoint } from 'tree-sitter';
import { TreeCursor as WebTreeCursor, Point as WebPoint } from 'web-tree-sitter';

type TreeCursor = NodeTreeCursor | WebTreeCursor;
type Point = NodePoint | WebPoint;

export interface SyntaxNodeSurrogate {
  type: string;
  startPosition: Point;
  endPosition: Point;
  children: SyntaxNodeSurrogate[];
  [key: string]: unknown;
}

class PreOrderCursorChildrenIterator {
  protected cursor;

  constructor(cursor: TreeCursor) {
    this.cursor = cursor;
  }

  protected createNode(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      children: [],
    };
  }

  public *[Symbol.iterator]() {
    // @ts-ignore
    const method = this[this.cursor.nodeType];
    const currentNode = (method || this.createNode).call(this) as SyntaxNodeSurrogate;
    const constructor = this.constructor as any;

    if (this.cursor.gotoFirstChild()) {
      currentNode.children.push(...[...new constructor(this.cursor)]);

      while (this.cursor.gotoNextSibling()) {
        currentNode.children.push(...[...new constructor(this.cursor)]);
      }

      this.cursor.gotoParent();
    }

    yield currentNode;
  }
}

export default PreOrderCursorChildrenIterator;
