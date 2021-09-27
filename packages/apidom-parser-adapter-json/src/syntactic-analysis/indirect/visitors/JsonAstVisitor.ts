import stampit from 'stampit';
import { either } from 'ramda';
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

export const getNodeType = (node: any) => {
  if (isParseResultElement(node)) {
    return 'ParseResultElement';
  }
  if (isElement(node)) {
    return getNodeTypeApiDOM(node);
  }
  return getCSTNodeType(node);
};

// @ts-ignore
export const isNode = either(isElement, isCSTNode);

/* eslint-disable no-underscore-dangle */

const JsonAstVisitor = stampit({
  props: {
    sourceMap: false,
    annotations: [],
  },
  init() {
    /**
     * Private API.
     */

    this.annotation = [];

    const maybeAddSourceMap = (node: JsonNode, element: Element): void => {
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

    this.document = function document(node: JsonDocument) {
      const element = new ParseResultElement();
      // @ts-ignore
      element._content = node.children;
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

    this.object = function object(node: JsonObject) {
      const element = new ObjectElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.property = function property(node: JsonProperty) {
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

    this.key = function key(node: JsonKey) {
      const element = new StringElement(node.value);
      maybeAddSourceMap(node, element);
      return element;
    };

    this.array = function array(node: JsonArray) {
      const element = new ArrayElement();
      // @ts-ignore
      element._content = node.children;
      maybeAddSourceMap(node, element);
      return element;
    };

    this.string = function string(node: JsonString) {
      const element = new StringElement(node.value);
      maybeAddSourceMap(node, element);
      return element;
    };

    this.number = function number(node: JsonNumber) {
      const element = new NumberElement(Number(node.value));
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.null = function _null(node: JsonNull) {
      const element = new NullElement();
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.true = function _true(node: JsonTrue) {
      const element = new BooleanElement(true);
      maybeAddSourceMap(node, element);
      return element;
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.false = function _false(node: JsonFalse) {
      const element = new BooleanElement(false);
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
      const message = node.isUnexpected ? `(Unexpected ${node.value})` : `(Error ${node.value})`;
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

export default JsonAstVisitor;
