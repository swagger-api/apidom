import stampit from 'stampit';
import {
  YamlDocument,
  YamlStream,
  YamlComment,
  YamlMapping,
  YamlKeyValuePair,
  YamlSequence,
  Literal,
  Error,
  getNodeType as getCSTNodeType,
  isNode as isCSTNode,
  YamlScalar,
  YamlStyle,
} from '@swagger-api/apidom-ast';
import {
  ParseResultElement,
  AnnotationElement,
  CommentElement,
  SourceMapElement,
  Element,
  MemberElement,
  ObjectElement,
  ArrayElement,
  isPrimitiveElement,
  isElement,
  keyMap as keyMapApiDOM,
  getNodeType as getNodeTypeApiDOM,
  createNamespace,
} from '@swagger-api/apidom-core';

export const keyMap = {
  stream: ['children'],
  document: ['children'],
  mapping: ['children'],
  keyValuePair: ['children'],
  sequence: ['children'],
  error: ['children'],
  ...keyMapApiDOM,
};

export const getNodeType = (node: any) => {
  if (isElement(node)) {
    return getNodeTypeApiDOM(node);
  }
  return getCSTNodeType(node);
};

export const isNode = (node: any) => isElement(node) || isCSTNode(node) || Array.isArray(node);

/* eslint-disable no-underscore-dangle */

const YamlAstVisitor = stampit({
  props: {
    sourceMap: false,
    processedDocumentCount: 0,
    annotations: [],
    namespace: null,
  },
  init() {
    /**
     * Private API.
     */

    const maybeAddSourceMap = (node: any, element: Element): void => {
      if (!this.sourceMap) {
        return;
      }

      const sourceMap = new SourceMapElement();
      // @ts-ignore
      sourceMap.position = node.position;
      // @ts-ignore
      sourceMap.astNode = node;
      element.meta.set('sourceMap', sourceMap);
    };

    /**
     * Public API.
     */

    this.namespace = createNamespace();
    this.annotations = [];

    this.stream = {
      leave(node: YamlStream) {
        const element = new ParseResultElement();
        // @ts-ignore
        element._content = node.children.flat(1);

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

        return element;
      },
    };

    this.comment = function comment(node: YamlComment) {
      const isStreamComment = this.processedDocumentCount === 0;

      // we're only interested of stream comments before the first document
      if (isStreamComment) {
        // @ts-ignore
        const element = new CommentElement(node.content);
        maybeAddSourceMap(node, element);
        return element;
      }

      return null;
    };

    this.document = function document(node: YamlDocument) {
      const shouldWarnAboutMoreDocuments = this.processedDocumentCount === 1;
      const shouldSkipVisitingMoreDocuments = this.processedDocumentCount >= 1;

      if (shouldWarnAboutMoreDocuments) {
        const message =
          'Only first document within YAML stream will be used. Rest will be discarded.';
        const element = new AnnotationElement(message);
        element.classes.push('warning');
        maybeAddSourceMap(node, element);
        this.annotations.push(element);
      }

      if (shouldSkipVisitingMoreDocuments) {
        return null;
      }

      this.processedDocumentCount += 1;

      return node.children;
    };

    this.mapping = function mapping(node: YamlMapping) {
      const element = new ObjectElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.keyValuePair = function keyValuePair(node: YamlKeyValuePair) {
      const element = new MemberElement();

      // @ts-ignore
      element.content.key = node.key;
      // @ts-ignore
      element.content.value = node.value;
      maybeAddSourceMap(node, element);

      // process possible errors here that may be present in property node children as we're using direct field access
      node.children
        .filter((child: any) => child.type === 'error')
        .forEach((errorNode: any) => {
          this.error(errorNode, node, [], [node]);
        });

      return element;
    };

    this.sequence = function sequence(node: YamlSequence) {
      const element = new ArrayElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.scalar = function scalar(node: YamlScalar) {
      const element = this.namespace.toElement(node.content);

      // translate style information about empty nodes
      if (node.content === '' && node.style === YamlStyle.Plain) {
        element.classes.push('yaml-e-node');
        element.classes.push('yaml-e-scalar');
      }
      maybeAddSourceMap(node, element);

      return element;
    };

    this.literal = function literal(node: Literal) {
      if (node.isMissing) {
        const message = `(Missing ${node.value})`;
        const element = new AnnotationElement(message);
        element.classes.push('warning');
        maybeAddSourceMap(node, element);
        this.annotations.push(element);
      }

      return null;
    };

    this.error = function error(node: Error, key: any, parent: any, path: string[]) {
      const message = node.isUnexpected
        ? '(Unexpected YAML syntax error)'
        : '(Error YAML syntax error)';
      const element = new AnnotationElement(message);

      element.classes.push('error');
      maybeAddSourceMap(node, element);

      if (path.length === 0) {
        // no document to visit, only error is present in CST
        const parseResultElement = new ParseResultElement();
        parseResultElement.push(element);
        return parseResultElement;
      }

      this.annotations.push(element);

      return null;
    };
  },
});

export default YamlAstVisitor;
