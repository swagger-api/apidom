import PreOrderCursorChildrenIterator, {
  SyntaxNodeSurrogate,
} from '../PreOrderCursorChildrenIterator';

class CursorIterator extends PreOrderCursorChildrenIterator {
  document(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      children: [],
    };
  }

  object(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      fieldName: this.cursor.currentFieldName,
      children: [],
    };
  }

  array(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      fieldName: this.cursor.currentFieldName,
      children: [],
    };
  }

  pair(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      get keyNode() {
        return this.children.find((node: any) => node.fieldName === 'key');
      },
      get valueNode() {
        return this.children.find((node: any) => node.fieldName === 'value');
      },
      children: [],
    };
  }

  string(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      text: this.cursor.nodeText,
      fieldName: this.cursor.currentFieldName,
      children: [],
    };
  }

  number(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      text: this.cursor.nodeText,
      fieldName: this.cursor.currentFieldName,
      children: [],
    };
  }

  null(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      fieldName: this.cursor.currentFieldName,
      children: [],
    };
  }

  true(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      fieldName: this.cursor.currentFieldName,
      children: [],
    };
  }

  false(): SyntaxNodeSurrogate {
    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      fieldName: this.cursor.currentFieldName,
      children: [],
    };
  }

  ERROR(): SyntaxNodeSurrogate {
    const { currentNode } = this.cursor;

    return {
      type: this.cursor.nodeType,
      startPosition: this.cursor.startPosition,
      endPosition: this.cursor.endPosition,
      // @ts-ignore
      hasError: () => currentNode.hasError(),
      children: [],
    };
  }
}

export default CursorIterator;
