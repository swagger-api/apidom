import stampit from 'stampit';
import { Tree as NodeTree, SyntaxNode as NodeSyntaxNode } from 'tree-sitter';
import { Tree as WebTree, SyntaxNode as WebSyntaxNode } from 'web-tree-sitter';
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

/* eslint-disable no-underscore-dangle */

type Tree = WebTree | NodeTree;
type SyntaxNode = WebSyntaxNode | NodeSyntaxNode;

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

    const toPosition = (node: SyntaxNode | null): Array<ArrayElement> | null => {
      if (node === null) {
        return null;
      }

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

    const maybeAddSourceMap = (node: SyntaxNode, element: Element): void => {
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

    const getFieldFromNode = (fieldName: string, node: SyntaxNode): SyntaxNode | null => {
      return `${fieldName}Node` in node
        ? // @ts-ignore
          node[`${fieldName}Node`]
        : 'childForFieldName' in node
        ? node.childForFieldName?.(fieldName)
        : null;
    };

    /**
     * Public API.
     */

    this.enter = function enter(node: SyntaxNode) {
      // missing anonymous literals from CST transformed into AnnotationElements.
      // WARNING: be aware that web-tree-sitter and tree-sitter node bindings have inconsistency
      // in `SyntaxNode.isNamed` property. web-tree-sitter has it defined as method
      // whether tree-sitter node binding has it defined as a boolean property.
      if (
        ((typeof node.isNamed === 'function' && !node.isNamed()) || node.isNamed === false) &&
        node.isMissing()
      ) {
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

    this.document = function document(node: SyntaxNode) {
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

    this.object = function object(node: SyntaxNode) {
      const element = new ObjectElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.array = function array(node: SyntaxNode) {
      const element = new ArrayElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.pair = function pair(node: SyntaxNode) {
      const element = new MemberElement();
      // @ts-ignore
      element.content.key = getFieldFromNode('key', node);
      // @ts-ignore
      element.content.value = getFieldFromNode('value', node);
      maybeAddSourceMap(node, element);

      /**
       * Process possible errors here that may be present in pair node children as we're using direct field access.
       * There are usually 3 children here found: "key", ":", "value".
       */
      if (node.children.length > 3) {
        node.children
          // @ts-ignore
          .filter((child: SyntaxNode) => child.type === 'ERROR')
          .forEach((errorNode: SyntaxNode) => {
            this.ERROR(errorNode, node, [], [node]);
          });
      }

      return element;
    };

    this.string = function string(node: SyntaxNode) {
      const element = new StringElement(node.text.slice(1, -1));
      maybeAddSourceMap(node, element);
      return element;
    };

    this.number = function number(node: SyntaxNode) {
      const element = new NumberElement(Number(node.text));
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.null = function _null(node: SyntaxNode) {
      const element = new NullElement();
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.true = function _true(node: SyntaxNode) {
      const element = new BooleanElement(true);
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.false = function _false(node: SyntaxNode) {
      const element = new BooleanElement(false);
      maybeAddSourceMap(node, element);
      return element;
    };

    this.ERROR = function ERROR(node: SyntaxNode, key: any, parent: any, path: string[]) {
      // collect errors as annotations
      const isUnexpected = !node.hasError();
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
 * This version of syntactic analysis translates TreeSitter CTS into ApiDOM.
 * Single traversal pass is needed to get from CST to ApiDOM.
 */
const analyze = (cst: Tree, { sourceMap = false } = {}): ParseResultElement => {
  const visitor = Visitor();

  return visit(cst.rootNode, visitor, {
    // @ts-ignore
    keyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    // @ts-ignore
    nodePredicate: isNode,
    state: {
      sourceMap,
    },
  });
};

export default analyze;
