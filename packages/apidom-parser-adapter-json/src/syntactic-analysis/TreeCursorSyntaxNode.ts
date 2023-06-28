import { TreeCursor as NodeTreeCursor, Point as NodePoint } from 'tree-sitter';
import { TreeCursor as WebTreeCursor, Point as WebPoint } from 'web-tree-sitter';

class TreeCursorSyntaxNode {
  public readonly type: string;

  public readonly startPosition: NodePoint | WebPoint;

  public readonly endPosition: NodePoint | WebPoint;

  public readonly startIndex: number;

  public readonly endIndex: number;

  public readonly text: string;

  public readonly isNamed: boolean;

  public readonly isMissing: boolean;

  public fieldName: string | undefined;

  public hasError = false;

  public readonly children: TreeCursorSyntaxNode[] = [];

  constructor(cursor: NodeTreeCursor | WebTreeCursor) {
    this.type = cursor.nodeType;
    this.startPosition = cursor.startPosition;
    this.endPosition = cursor.endPosition;
    this.startIndex = cursor.startIndex;
    this.endIndex = cursor.endIndex;
    this.text = cursor.nodeText;
    this.isNamed = cursor.nodeIsNamed;
    this.isMissing = cursor.nodeIsMissing;
  }

  get keyNode(): TreeCursorSyntaxNode | undefined {
    if (this.type === 'pair') {
      return this.children.find((node) => node.fieldName === 'key');
    }
    return undefined;
  }

  get valueNode(): TreeCursorSyntaxNode | undefined {
    if (this.type === 'pair') {
      return this.children.find((node) => node.fieldName === 'value');
    }
    return undefined;
  }

  setFieldName(cursor: NodeTreeCursor | WebTreeCursor) {
    if (typeof cursor.currentFieldName === 'function') {
      this.fieldName = cursor.currentFieldName();
    } else {
      this.fieldName = cursor.currentFieldName;
    }
    return this;
  }

  setHasError(cursor: NodeTreeCursor | WebTreeCursor) {
    if (typeof cursor.currentNode === 'function') {
      this.hasError = cursor.currentNode().hasError();
    } else {
      this.hasError = cursor.currentNode.hasError();
    }
    return this;
  }

  pushChildren(...children: TreeCursorSyntaxNode[]) {
    this.children.push(...children);
  }
}

export default TreeCursorSyntaxNode;
