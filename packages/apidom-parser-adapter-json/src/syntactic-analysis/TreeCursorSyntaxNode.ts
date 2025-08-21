import { TreeCursor as NodeTreeCursor } from 'tree-sitter';
import { TreeCursor as WebTreeCursor } from 'web-tree-sitter';

class TreeCursorSyntaxNode {
  public readonly type: string;

  public readonly startPositionRow: number;

  public readonly startPositionColumn: number;

  public readonly startIndex: number;

  public readonly endPositionRow: number;

  public readonly endPositionColumn: number;

  public readonly endIndex: number;

  public readonly text: string;

  public readonly isNamed: boolean;

  public readonly isMissing: boolean;

  public fieldName: string | undefined;

  public hasError = false;

  public readonly children: TreeCursorSyntaxNode[] = [];

  constructor(cursor: NodeTreeCursor | WebTreeCursor) {
    this.type = cursor.nodeType;
    this.startPositionRow = cursor.startPosition.row;
    this.startPositionColumn = cursor.startPosition.column;
    this.startIndex = cursor.startIndex;
    this.endPositionRow = cursor.endPosition.row;
    this.endPositionColumn = cursor.endPosition.column;
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
    this.fieldName = cursor.currentFieldName;
    return this;
  }

  setHasError(cursor: NodeTreeCursor | WebTreeCursor) {
    this.hasError = cursor.currentNode.hasError;
    return this;
  }

  pushChildren(...children: TreeCursorSyntaxNode[]) {
    this.children.push(...children);
  }
}

export default TreeCursorSyntaxNode;
