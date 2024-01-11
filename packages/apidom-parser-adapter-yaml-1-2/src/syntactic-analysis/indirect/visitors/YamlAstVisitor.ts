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
  Namespace,
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

export const getNodeType = (node: unknown) => {
  if (isElement(node)) {
    return getNodeTypeApiDOM(node);
  }
  return getCSTNodeType(node);
};

export const isNode = (node: unknown) => isElement(node) || isCSTNode(node) || Array.isArray(node);

/* eslint-disable no-underscore-dangle */

class YamlAstVisitor {
  public sourceMap: boolean = false;

  public annotations: AnnotationElement[];

  public namespace: Namespace;

  protected processedDocumentCount: number = 0;

  public readonly stream = {
    leave: (node: YamlStream): ParseResultElement => {
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

  constructor() {
    this.annotations = [];
    this.namespace = createNamespace();
  }

  public comment(node: YamlComment): CommentElement | null {
    const isStreamComment = this.processedDocumentCount === 0;

    // we're only interested of stream comments before the first document
    if (isStreamComment) {
      // @ts-ignore
      const element = new CommentElement(node.content);
      this.maybeAddSourceMap(node, element);
      return element;
    }

    return null;
  }

  public document(node: YamlDocument): unknown[] | null {
    const shouldWarnAboutMoreDocuments = this.processedDocumentCount === 1;
    const shouldSkipVisitingMoreDocuments = this.processedDocumentCount >= 1;

    if (shouldWarnAboutMoreDocuments) {
      const message =
        'Only first document within YAML stream will be used. Rest will be discarded.';
      const element = new AnnotationElement(message);
      element.classes.push('warning');
      this.maybeAddSourceMap(node, element);
      this.annotations.push(element);
    }

    if (shouldSkipVisitingMoreDocuments) {
      return null;
    }

    this.processedDocumentCount += 1;

    return node.children;
  }

  public mapping(node: YamlMapping): ObjectElement {
    const element = new ObjectElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }

  public keyValuePair(node: YamlKeyValuePair): MemberElement {
    const element = new MemberElement();

    // @ts-ignore
    element.content.key = node.key;
    // @ts-ignore
    element.content.value = node.value;
    this.maybeAddSourceMap(node, element);

    // process possible errors here that may be present in property node children as we're using direct field access
    node.children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((child: any) => child.type === 'error')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .forEach((errorNode: any) => {
        this.error(errorNode, node, [], [node]);
      });

    return element;
  }

  public sequence(node: YamlSequence): ArrayElement {
    const element = new ArrayElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }

  public scalar(node: YamlScalar): Element {
    const element = this.namespace.toElement(node.content);

    // translate style information about empty nodes
    if (node.content === '' && node.style === YamlStyle.Plain) {
      element.classes.push('yaml-e-node');
      element.classes.push('yaml-e-scalar');
    }
    this.maybeAddSourceMap(node, element);

    return element;
  }

  public literal(node: Literal): null {
    if (node.isMissing) {
      const message = `(Missing ${node.value})`;
      const element = new AnnotationElement(message);
      element.classes.push('warning');
      this.maybeAddSourceMap(node, element);
      this.annotations.push(element);
    }

    return null;
  }

  public error(
    node: Error,
    key: unknown,
    parent: unknown,
    path: string[] | YamlKeyValuePair[],
  ): ParseResultElement | null {
    const message = node.isUnexpected
      ? '(Unexpected YAML syntax error)'
      : '(Error YAML syntax error)';
    const element = new AnnotationElement(message);

    element.classes.push('error');
    this.maybeAddSourceMap(node, element);

    if (path.length === 0) {
      // no document to visit, only error is present in CST
      const parseResultElement = new ParseResultElement();
      parseResultElement.push(element);
      return parseResultElement;
    }

    this.annotations.push(element);

    return null;
  }

  private maybeAddSourceMap(node: unknown, element: Element): void {
    if (!this.sourceMap) {
      return;
    }

    const sourceMap = new SourceMapElement();
    // @ts-ignore
    sourceMap.position = node.position;
    // @ts-ignore
    sourceMap.astNode = node;
    element.meta.set('sourceMap', sourceMap);
  }
}

export default YamlAstVisitor;
