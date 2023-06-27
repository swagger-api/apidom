import stampit from 'stampit';
import { Tree as NodeTree } from 'tree-sitter';
import { Tree as WebTree } from 'web-tree-sitter';
import { visit, getNodeType as getCSTNodeType, isNode as isCSTNode } from '@swagger-api/apidom-ast';
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
  isElement,
  isParseResultElement,
  isPrimitiveElement,
  keyMap as keyMapApiDOM,
  getNodeType as getNodeTypeApiDOM,
} from '@swagger-api/apidom-core';

import TreeCursorIterator from '../TreeCursorIterator';
import TreeCursorSyntaxNode from '../TreeCursorSyntaxNode';

/* eslint-disable no-underscore-dangle */

const keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children'],
  ...keyMapApiDOM,
};

const getNodeType = (node: any) => {
  if (isParseResultElement(node)) {
    return 'ParseResultElement';
  }
  if (isElement(node)) {
    return getNodeTypeApiDOM(node);
  }
  return getCSTNodeType(node);
};

// @ts-ignore
const isNode = (element: any) => isElement(element) || isCSTNode(element);

const Visitor = stampit({
  props: {
    sourceMap: false,
    annotations: [],
  },
  init() {
    /**
     * Private API.
     */

    this.annotations = [];

    const toPosition = (node: TreeCursorSyntaxNode): Array<ArrayElement> => {
      const start = new ArrayElement([
        node.startPosition.row,
        node.startPosition.column,
        node.startIndex,
      ]);
      const end = new ArrayElement([node.endPosition.row, node.endPosition.column, node.endIndex]);

      start.classes.push('position');
      end.classes.push('position');

      return [start, end];
    };

    const maybeAddSourceMap = (node: TreeCursorSyntaxNode, element: Element): void => {
      if (!this.sourceMap) {
        return;
      }

      const sourceMap = new SourceMapElement();
      const position = toPosition(node);

      if (position !== null) {
        const [start, end] = position;
        sourceMap.push(start);
        sourceMap.push(end);
      }
      // @ts-ignore
      sourceMap.astNode = node;
      element.meta.set('sourceMap', sourceMap);
    };

    /**
     * Public API.
     */

    this.enter = function enter(node: TreeCursorSyntaxNode) {
      // missing anonymous literals from CST transformed into AnnotationElements.
      if (!node.isNamed && node.isMissing) {
        // collect annotations from missing literals
        const value = node.type || node.text;
        const message = `(Missing ${value})`;
        const element = new AnnotationElement(message);

        element.classes.push('warning');
        maybeAddSourceMap(node, element);
        this.annotations.push(element);
      }

      return null; // remove everything unrecognized
    };

    this.document = function document(node: TreeCursorSyntaxNode) {
      const element = new ParseResultElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.ParseResultElement = {
      leave(element: ParseResultElement) {
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

    this.object = function object(node: TreeCursorSyntaxNode) {
      const element = new ObjectElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.array = function array(node: TreeCursorSyntaxNode) {
      const element = new ArrayElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.pair = function pair(node: TreeCursorSyntaxNode) {
      const element = new MemberElement();
      // @ts-ignore
      element.content.key = node.keyNode;
      // @ts-ignore
      element.content.value = node.valueNode;
      maybeAddSourceMap(node, element);

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
    };

    this.string = function string(node: TreeCursorSyntaxNode) {
      const element = new StringElement(node.text.slice(1, -1));
      maybeAddSourceMap(node, element);
      return element;
    };

    this.number = function number(node: TreeCursorSyntaxNode) {
      const element = new NumberElement(Number(node.text));
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.null = function _null(node: TreeCursorSyntaxNode) {
      const element = new NullElement();
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.true = function _true(node: TreeCursorSyntaxNode) {
      const element = new BooleanElement(true);
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.false = function _false(node: TreeCursorSyntaxNode) {
      const element = new BooleanElement(false);
      maybeAddSourceMap(node, element);
      return element;
    };

    this.ERROR = function ERROR(
      node: TreeCursorSyntaxNode,
      key: any,
      parent: TreeCursorSyntaxNode,
      path: string[],
    ) {
      // collect errors as annotations
      const isUnexpected = !node.hasError;
      const value = node.text;
      const message = isUnexpected ? `(Unexpected ${value})` : `(Error ${value})`;
      const element = new AnnotationElement(message);

      element.classes.push('error');
      maybeAddSourceMap(node, element);

      if (path.length === 0) {
        // no document to visit, only error is present in CST
        const parseResultElement = new ParseResultElement();
        parseResultElement.push(element);
        return parseResultElement;
      }

      // we have CST node for document
      this.annotations.push(element);

      return null;
    };
  },
});

/**
 * This version of syntactic analysis translates TreeSitter CTS
 * directly into ApiDOM.
 *
 * Transient transformation of TreeSitter CST is performed
 * using TreeSitter cursor. TreeSitter cursor is a stateful object
 * that allows us to walk syntax tree containing large number of nodes
 * with maximum efficiency. Using this transient CST transformation
 * gives us double the performance when syntactically analyzing
 * CST into ApiDOM.
 *
 * Single traversal pass is needed to get from CST to ApiDOM.
 */
const analyze = (cst: NodeTree | WebTree, { sourceMap = false } = {}): ParseResultElement => {
  const visitor = Visitor();
  const cursor = cst.walk();
  const iterator = new TreeCursorIterator(cursor);
  const rootNode = [...iterator].at(0) as TreeCursorSyntaxNode;

  return visit(rootNode, visitor, {
    // @ts-ignore
    keyMap,
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode,
    state: { sourceMap },
  });
};

export default analyze;
