import stampit from 'stampit';
import { last } from 'ramda';
import { isNotNull } from 'ramda-adjunct';
import { visit, BREAK } from '../visitor';
import { isOpenApiExtension } from '../predicates';
import SpecificationVisitor from './SpecificationVisitor';

export const ArrayVisitor = stampit(SpecificationVisitor).init(function ArrayVisitor() {
  const stack = [];

  this.object = function object(objectNode) {
    const arrayElement = last(stack);
    const objectVisitor = this.retrieveVisitorInstance(['object']);

    visit(objectNode, objectVisitor);

    const { element: objectElement } = objectVisitor;

    arrayElement.push(this.maybeAddSourceMap(objectNode, objectElement));

    return false;
  };

  this.string = function string(stringNode) {
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.string(stringNode);
    arrayElement.push(valueVisitor.element);
  };

  this.number = function number(numberNode) {
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.number(numberNode);
    arrayElement.push(valueVisitor.element);
  };

  this.true = function _true(trueNode) {
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.true(trueNode);
    arrayElement.push(valueVisitor.element);
  };

  this.false = function _false(falseNode) {
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.false(falseNode);
    arrayElement.push(valueVisitor.element);
  };

  this.null = function _null(nullNode) {
    const arrayElement = last(stack);
    const valueVisitor = this.retrieveVisitorInstance(['value']);

    valueVisitor.null(nullNode);
    arrayElement.push(valueVisitor.element);
  };

  this.array = {
    enter: (arrayNode) => {
      const arrayElement = this.maybeAddSourceMap(arrayNode, new this.namespace.elements.Array());
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      stack.push(arrayElement);

      visit(arrayNode.comments, commentVisitor);
      arrayElement.meta.set('comments', commentVisitor.element);

      if (isNotNull(this.element)) {
        this.element.push(arrayElement);
      } else {
        this.element = arrayElement;
      }
    },
    leave: () => {
      this.element = stack.pop();
    },
  };
});

export const ObjectVisitor = stampit(SpecificationVisitor).init(function ObjectVisitor() {
  const stack = [];

  this.property = function property(propertyNode) {
    const objElement = last(stack);
    const { MemberElement } = this.namespace.elements.Element.prototype;
    const keyElement = new this.namespace.elements.String(propertyNode.key.value);
    let valueElement;

    // object property value handling
    if (propertyNode.value.type === 'object') {
      const objectVisitor = this.retrieveVisitorInstance(['object']);

      visit(propertyNode.value, objectVisitor);

      ({ element: valueElement } = objectVisitor);
    } else if (propertyNode.value.type === 'array') {
      const arrayVisitor = this.retrieveVisitorInstance(['array']);

      visit(propertyNode.value, arrayVisitor);

      ({ element: valueElement } = arrayVisitor);
    } else if (propertyNode.key.value === '$ref') {
      // $ref property key special handling
      valueElement = new this.namespace.elements.Ref(propertyNode.value.value);
      valueElement.path = propertyNode.value.value;
    } else if (!isOpenApiExtension({}, propertyNode)) {
      valueElement = this.namespace.toElement(propertyNode.value.value);
    }

    if (isOpenApiExtension({}, propertyNode)) {
      objElement.content.push(
        this.mapPropertyNodeToMemberElement(
          ['document', 'openApi', 'openApiExtension'],
          propertyNode,
        ),
      );
    } else {
      objElement.content.push(
        new MemberElement(
          this.maybeAddSourceMap(propertyNode.key, keyElement),
          this.maybeAddSourceMap(propertyNode.value, valueElement),
        ),
      );
    }

    return false;
  };

  this.object = {
    enter: (objectNode) => {
      const objectElement = this.maybeAddSourceMap(
        objectNode,
        new this.namespace.elements.Object(),
      );
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      visit(objectNode.comments, commentVisitor);
      objectElement.meta.set('comments', commentVisitor.element);
      stack.push(objectElement);
    },
    leave: () => {
      this.element = stack.pop();
    },
  };
});

export const ValueVisitor = stampit(SpecificationVisitor, {
  methods: {
    array(arrayNode) {
      const arrayVisitor = this.retrieveVisitorInstance(['array']);

      visit(arrayNode, arrayVisitor);

      this.element = arrayVisitor.element;

      return BREAK;
    },

    object(objectNode) {
      const objectVisitor = this.retrieveVisitorInstance(['object']);

      visit(objectNode, objectVisitor);

      this.element = objectVisitor.element;

      return BREAK;
    },

    string(stringNode) {
      const stringElement = new this.namespace.elements.String(stringNode.value);
      this.element = this.maybeAddSourceMap(stringNode, stringElement);
      return BREAK;
    },

    number(numberNode) {
      const numberElement = new this.namespace.elements.Number(Number(numberNode.value));
      this.element = this.maybeAddSourceMap(numberNode, numberElement);
      return BREAK;
    },

    true(trueNode) {
      const booleanElement = new this.namespace.elements.Boolean(trueNode.value);
      this.element = this.maybeAddSourceMap(trueNode, booleanElement);
      return BREAK;
    },

    false(falseNode) {
      const booleanElement = new this.namespace.elements.Boolean(falseNode.value);
      this.element = this.maybeAddSourceMap(falseNode, booleanElement);
      return BREAK;
    },

    null(nullNode) {
      const nullElement = new this.namespace.elements.Null(nullNode.value);
      this.element = this.maybeAddSourceMap(nullNode, nullElement);
      return BREAK;
    },
  },
});
