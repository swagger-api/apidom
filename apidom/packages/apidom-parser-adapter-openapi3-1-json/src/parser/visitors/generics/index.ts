import stampit from 'stampit';
import { last } from 'ramda';
import { isNotNull } from 'ramda-adjunct';
import {
  JsonArray,
  JsonFalse,
  JsonNull,
  JsonNumber,
  JsonObject,
  JsonProperty,
  JsonString,
  JsonTrue,
} from 'apidom-ast';
import { visit, BREAK } from '..';
import { isOpenApiExtension } from '../../predicates';
import SpecificationVisitor from '../SpecificationVisitor';

export const ArrayVisitor = stampit(SpecificationVisitor).init(function ArrayVisitor() {
  // @ts-ignore
  const stack = [];

  // @ts-ignore
  this.object = function object(objectNode: JsonObject) {
    // @ts-ignore
    const arrayElement = last(stack);
    const objectVisitor = this.retrieveVisitorInstance(['object']);

    visit(objectNode, objectVisitor);

    const { element: objectElement } = objectVisitor;

    arrayElement.push(this.maybeAddSourceMap(objectNode, objectElement));

    return false;
  };

  this.string = function string(stringNode: JsonString) {
    // @ts-ignore
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.string(stringNode);
    arrayElement.push(valueVisitor.element);
  };

  this.number = function number(numberNode: JsonNumber) {
    // @ts-ignore
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.number(numberNode);
    arrayElement.push(valueVisitor.element);
  };

  this.true = function _true(trueNode: JsonTrue) {
    // @ts-ignore
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.true(trueNode);
    arrayElement.push(valueVisitor.element);
  };

  this.false = function _false(falseNode: JsonFalse) {
    // @ts-ignore
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.false(falseNode);
    arrayElement.push(valueVisitor.element);
  };

  this.null = function _null(nullNode: JsonNull) {
    // @ts-ignore
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.null(nullNode);
    arrayElement.push(valueVisitor.element);
  };

  this.array = {
    enter: (arrayNode: JsonArray) => {
      const arrayElement = this.maybeAddSourceMap(arrayNode, new this.namespace.elements.Array());

      stack.push(arrayElement);

      if (isNotNull(this.element)) {
        this.element.push(arrayElement);
      } else {
        this.element = arrayElement;
      }
    },
    leave: () => {
      // @ts-ignore
      this.element = stack.pop();
    },
  };
});

export const ObjectVisitor = stampit(SpecificationVisitor).init(function ObjectVisitor() {
  // @ts-ignore
  const stack = [];

  this.property = function property(propertyNode: JsonProperty) {
    // @ts-ignore
    const objElement = last(stack);
    const { MemberElement } = this.namespace.elements.Element.prototype;
    const keyElement = new this.namespace.elements.String(propertyNode.key.value);
    let valueElement;

    // object property value handling
    // @ts-ignore
    if (propertyNode.value.type === 'object') {
      const objectVisitor = this.retrieveVisitorInstance(['object']);

      visit(propertyNode.value, objectVisitor);

      ({ element: valueElement } = objectVisitor);
      // @ts-ignore
    } else if (propertyNode.value.type === 'array') {
      const arrayVisitor = this.retrieveVisitorInstance(['array']);

      visit(propertyNode.value, arrayVisitor);

      ({ element: valueElement } = arrayVisitor);
    } else if (propertyNode.key.value === '$ref') {
      // $ref property key special handling
      // @ts-ignore
      valueElement = new this.namespace.elements.Ref(propertyNode.value.value);
      // @ts-ignore
      valueElement.path = propertyNode.value.value;
    } else if (!isOpenApiExtension({}, propertyNode)) {
      // @ts-ignore
      valueElement = this.namespace.toElement(propertyNode.value.value);
    }

    if (isOpenApiExtension({}, propertyNode)) {
      objElement.content.push(this.nodeToElement(['document', 'extension'], propertyNode));
    } else {
      objElement.content.push(
        this.maybeAddSourceMap(
          propertyNode,
          new MemberElement(
            this.maybeAddSourceMap(propertyNode.key, keyElement),
            this.maybeAddSourceMap(propertyNode.value, valueElement),
          ),
        ),
      );
    }

    return false;
  };

  this.object = {
    enter: (objectNode: JsonObject) => {
      const objectElement = this.maybeAddSourceMap(
        objectNode,
        new this.namespace.elements.Object(),
      );

      // @ts-ignore
      stack.push(objectElement);
    },
    leave: () => {
      // @ts-ignore
      this.element = stack.pop();
    },
  };
});

export const ValueVisitor = stampit(SpecificationVisitor, {
  methods: {
    array(arrayNode: JsonArray) {
      const arrayVisitor = this.retrieveVisitorInstance(['array']);

      visit(arrayNode, arrayVisitor);

      this.element = arrayVisitor.element;

      return BREAK;
    },

    object(objectNode: JsonObject) {
      const objectVisitor = this.retrieveVisitorInstance(['object']);

      visit(objectNode, objectVisitor);

      this.element = objectVisitor.element;

      return BREAK;
    },

    string(stringNode: JsonString) {
      const stringElement = new this.namespace.elements.String(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, stringElement);
      return BREAK;
    },

    number(numberNode: JsonNumber) {
      const numberElement = new this.namespace.elements.Number(Number(numberNode.value));
      this.element = this.maybeAddSourceMap(numberNode, numberElement);
      return BREAK;
    },

    true(trueNode: JsonTrue) {
      const booleanElement = new this.namespace.elements.Boolean(true);
      this.element = this.maybeAddSourceMap(trueNode, booleanElement);
      return BREAK;
    },

    false(falseNode: JsonFalse) {
      const booleanElement = new this.namespace.elements.Boolean(false);
      this.element = this.maybeAddSourceMap(falseNode, booleanElement);
      return BREAK;
    },

    null(nullNode: JsonNull) {
      const nullElement = new this.namespace.elements.Null(nullNode.value);
      this.element = this.maybeAddSourceMap(nullNode, nullElement);
      return BREAK;
    },
  },
});
