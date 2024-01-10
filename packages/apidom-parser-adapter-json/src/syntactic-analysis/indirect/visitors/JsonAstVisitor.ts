import {
  JsonArray,
  JsonDocument,
  JsonObject,
  JsonProperty,
  JsonNode,
  JsonString,
  JsonNumber,
  JsonNull,
  JsonTrue,
  JsonFalse,
  JsonKey,
  ParseResult,
  Error,
  Literal,
  isNode as isCSTNode,
  getNodeType as getCSTNodeType,
} from '@swagger-api/apidom-ast';
import {
  Element,
  ParseResultElement,
  ObjectElement,
  SourceMapElement,
  MemberElement,
  ArrayElement,
  BooleanElement,
  NullElement,
  NumberElement,
  StringElement,
  AnnotationElement,
  isParseResultElement,
  isPrimitiveElement,
  isElement,
  keyMap as keyMapApiDOM,
  getNodeType as getNodeTypeApiDOM,
} from '@swagger-api/apidom-core';

export const keyMap = {
  // @ts-ignore
  [ParseResult.type]: ['children'],
  // @ts-ignore
  [JsonDocument.type]: ['children'],
  // @ts-ignore
  [JsonObject.type]: ['children'],
  // @ts-ignore
  [JsonProperty.type]: ['children'],
  // @ts-ignore
  [JsonArray.type]: ['children'],
  // @ts-ignore
  [Error.type]: ['children'],
  ...keyMapApiDOM,
};

export const getNodeType = (node: unknown) => {
  if (isParseResultElement(node)) {
    return 'ParseResultElement';
  }
  if (isElement(node)) {
    return getNodeTypeApiDOM(node);
  }
  return getCSTNodeType(node);
};

export const isNode = (element: unknown) => isElement(element) || isCSTNode(element);

/* eslint-disable no-underscore-dangle */

class JsonAstVisitor {
  sourceMap: SourceMapElement | boolean = false;

  annotations: AnnotationElement[] = [];

  /**
   * Private API.
   */

  private maybeAddSourceMap(node: JsonNode, element: Element): void {
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

  /**
   * Public API.
   */

  // eslint-disable-next-line class-methods-use-this
  document(node: JsonDocument): ParseResultElement {
    const element = new ParseResultElement();
    // @ts-ignore
    element._content = node.children;
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

  object(node: JsonObject): ObjectElement {
    const element = new ObjectElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }

  property(node: JsonProperty): MemberElement {
    const element = new MemberElement();

    // @ts-ignore
    element.content.key = node.key;
    // @ts-ignore
    element.content.value = node.value;
    this.maybeAddSourceMap(node, element);

    /**
     * Process possible errors here that may be present in pair node children as we're using direct field access.
     * There are usually 3 children here found: "key", ":", "value".
     */
    if (node.children.length > 3) {
      node.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((child: any) => child.type === 'error')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .forEach((errorNode: any) => {
          this.error(errorNode, node, [], [node]);
        });
    }

    return element;
  }

  key(node: JsonKey): StringElement {
    const element = new StringElement(node.value);
    this.maybeAddSourceMap(node, element);
    return element;
  }

  array(node: JsonArray): ArrayElement {
    const element = new ArrayElement();
    // @ts-ignore
    element._content = node.children;
    this.maybeAddSourceMap(node, element);
    return element;
  }

  string(node: JsonString): StringElement {
    const element = new StringElement(node.value);
    this.maybeAddSourceMap(node, element);
    return element;
  }

  number(node: JsonNumber): NumberElement {
    const element = new NumberElement(Number(node.value));
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  null(node: JsonNull): NullElement {
    const element = new NullElement();
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  true(node: JsonTrue): BooleanElement {
    const element = new BooleanElement(true);
    this.maybeAddSourceMap(node, element);
    return element;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  false(node: JsonFalse): BooleanElement {
    const element = new BooleanElement(false);
    this.maybeAddSourceMap(node, element);
    return element;
  }

  literal(node: Literal): null {
    if (node.isMissing) {
      const message = `(Missing ${node.value})`;
      const element = new AnnotationElement(message);

      element.classes.push('warning');
      this.maybeAddSourceMap(node, element);
      this.annotations.push(element);
    }

    return null;
  }

  error(
    node: Error,
    key: unknown,
    parent: unknown,
    path: string[] | JsonProperty[],
  ): ParseResultElement | null {
    const message = node.isUnexpected ? `(Unexpected ${node.value})` : `(Error ${node.value})`;
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
}

export default JsonAstVisitor;
