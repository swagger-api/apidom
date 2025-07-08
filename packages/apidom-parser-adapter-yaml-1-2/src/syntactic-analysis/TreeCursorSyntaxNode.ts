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

  public previousSibling: TreeCursorSyntaxNode | undefined;

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
    if (this.type === 'flow_pair' || this.type === 'block_mapping_pair') {
      return this.children.find((node) => node.fieldName === 'key');
    }
    return undefined;
  }

  get valueNode(): TreeCursorSyntaxNode | undefined {
    if (this.type === 'flow_pair' || this.type === 'block_mapping_pair') {
      return this.children.find((node) => node.fieldName === 'value');
    }
    return undefined;
  }

  get tag(): TreeCursorSyntaxNode | undefined {
    let { previousSibling } = this;

    while (typeof previousSibling !== 'undefined' && previousSibling.type !== 'tag') {
      ({ previousSibling } = previousSibling);
    }

    return previousSibling;
  }

  get anchor(): TreeCursorSyntaxNode | undefined {
    let { previousSibling } = this;

    while (typeof previousSibling !== 'undefined' && previousSibling.type !== 'anchor') {
      ({ previousSibling } = previousSibling);
    }

    return previousSibling;
  }

  get firstNamedChild(): TreeCursorSyntaxNode | undefined {
    return this.children.find((node) => node.isNamed);
  }

  setFieldName(cursor: NodeTreeCursor | WebTreeCursor) {
    this.fieldName = cursor.currentFieldName;
    return this;
  }

  setHasError(cursor: NodeTreeCursor | WebTreeCursor) {
    this.hasError = cursor.currentNode.hasError;
    return this;
  }

  setPreviousSibling(previousSibling: TreeCursorSyntaxNode | undefined) {
    this.previousSibling = previousSibling;
  }

  pushChildren(...children: TreeCursorSyntaxNode[]) {
    this.children.push(...children);
  }
}

export default TreeCursorSyntaxNode;
