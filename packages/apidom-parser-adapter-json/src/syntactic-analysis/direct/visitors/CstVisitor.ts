import {
  BooleanElement,
  NullElement,
  NumberElement,
  ParseResultElement,
  Element,
  SourceMapElement,
  MemberElement,
  ObjectElement,
  ArrayElement,
  StringElement,
  AnnotationElement,
  isPrimitiveElement,
} from '@swagger-api/apidom-core';

import TreeCursorSyntaxNode from '../../TreeCursorSyntaxNode';

/* eslint-disable no-underscore-dangle */

class CstVisitor {
  sourceMap: SourceMapElement | boolean = false;

  annotations: AnnotationElement[] = [];

  /**
   * Private API.
   */

  // eslint-disable-next-line class-methods-use-this
  private toPosition(node: TreeCursorSyntaxNode): Array<ArrayElement> {
    const start = new ArrayElement([
      node.startPosition.row,
      node.startPosition.column,
      node.startIndex,
    ]);
    const end = new ArrayElement([node.endPosition.row, node.endPosition.column, node.endIndex]);

    start.classes.push('position');
    end.classes.push('position');

    return [start, end];
  }

  private maybeAddSourceMap(node: TreeCursorSyntaxNode, element: Element): void {
    if (!this.sourceMap) {
      return;
    }

    const sourceMap = new SourceMapElement();
    const position = this.toPosition(node);

    if (position !== null) {
      const [start, end] = position;
      sourceMap.push(start);
      sourceMap.push(end);
    }
    // @ts-ignore
    sourceMap.astNode = node;
    element.meta.set('sourceMap', sourceMap);
  }

  /**
   * Public API.
   */

  enter(node: TreeCursorSyntaxNode): null {
    // missing anonymous literals from CST transformed into AnnotationElements.
    if (node instanceof TreeCursorSyntaxNode && !node.isNamed && node.isMissing) {
      // collect annotations from missing literals
      const value = node.type || node.text;
      const message = `(Missing ${value})`;
      const element = new AnnotationElement(message);

      element.classes.push('warning');
      this.maybeAddSourceMap(node, element);
      this.annotations.push(element);
    }

    return null; // remove everything unrecognized
  }

  document(node: TreeCursorSyntaxNode): ParseResultElement {
    const element = new ParseResultElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }

  ParseResultElement = {
    leave: (element: ParseResultElement): void => {
      // mark first-non Annotation element as result
      // @ts-ignore
      const elements = element.findElements(isPrimitiveElement);
      if (elements.length > 0) {
        const resultElement = elements[0];
        resultElement.classes.push('result');
      }

      // provide annotations
      this.annotations.forEach((annotationElement: AnnotationElement) => {
        element.push(annotationElement);
      });
      this.annotations = [];
    },
  };

  object(node: TreeCursorSyntaxNode): ObjectElement {
    const element = new ObjectElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }

  array(node: TreeCursorSyntaxNode): ArrayElement {
    const element = new ArrayElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }

  pair(node: TreeCursorSyntaxNode): MemberElement {
    const element = new MemberElement();
    // @ts-ignore
    element.content.key = node.keyNode;
    // @ts-ignore
    element.content.value = node.valueNode;
    this.maybeAddSourceMap(node, element);

    /**
     * Process possible errors here that may be present in pair node children as we're using direct field access.
     * There are usually 3 children here found: "key", ":", "value".
     */
    if (node.children.length > 3) {
      node.children
        .filter((child) => child.type === 'ERROR')
        .forEach((errorNode) => {
          this.ERROR(errorNode, node, [], [node]);
        });
    }

    return element;
  }

  string(node: TreeCursorSyntaxNode): StringElement {
    const element = new StringElement(JSON.parse(node.text));
    this.maybeAddSourceMap(node, element);
    return element;
  }

  number(node: TreeCursorSyntaxNode): NumberElement {
    const element = new NumberElement(Number(node.text));
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  null(node: TreeCursorSyntaxNode): NullElement {
    const element = new NullElement();
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  true(node: TreeCursorSyntaxNode): BooleanElement {
    const element = new BooleanElement(true);
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  false(node: TreeCursorSyntaxNode): BooleanElement {
    const element = new BooleanElement(false);
    this.maybeAddSourceMap(node, element);
    return element;
  }

  ERROR(
    node: TreeCursorSyntaxNode,
    key: unknown,
    parent: TreeCursorSyntaxNode | never[],
    path: string[] | TreeCursorSyntaxNode[],
  ): ParseResultElement | null {
    // collect errors as annotations
    const isUnexpected = !node.hasError;
    const value = node.text;
    const message = isUnexpected ? `(Unexpected ${value})` : `(Error ${value})`;
    const element = new AnnotationElement(message);

    element.classes.push('error');
    this.maybeAddSourceMap(node, element);

    if (path.length === 0) {
      // no document to visit, only error is present in CST
      const parseResultElement = new ParseResultElement();
      parseResultElement.push(element);
      return parseResultElement;
    }

    // we have CST node for document
    this.annotations.push(element);

    return null;
  }
}

/* eslint-enable no-underscore-dangle */

export default CstVisitor;
