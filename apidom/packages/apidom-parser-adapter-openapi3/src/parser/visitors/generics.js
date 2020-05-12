'use strict';

const { last } = require('ramda');
const { addSourceMap } = require('../source-map');
const { visit } = require('../visitor');

const ArrayVisitor = () => {
  const stack = [];

  return {
    element: null,

    object(objectNode) {
      const arrayElement = last(stack);
      const objectVisitor = ObjectVisitor();
      const state = { namespace: this.namespace, sourceMap: this.sourceMap };

      visit(objectNode, objectVisitor, { state });

      const { element: objectElement } = objectVisitor;

      arrayElement.push(this.sourceMap ? addSourceMap(objectNode, objectElement) : objectElement);

      return false;
    },

    string(stringNode) {
      const arrayElement = last(stack);
      const stringElement = new this.namespace.elements.String(stringNode.value);

      arrayElement.push(this.sourceMap ? addSourceMap(stringNode, stringElement) : stringElement);
    },

    number(numberNode) {
      const arrayElement = last(stack);
      const numberElement = new this.namespace.elements.Number(Number(numberNode.value));

      arrayElement.push(this.sourceMap ? addSourceMap(numberNode, numberElement) : numberElement);
    },

    true(trueNode) {
      const arrayElement = last(stack);
      const booleanElement = new this.namespace.elements.Boolean(trueNode.value);

      arrayElement.push(this.sourceMap ? addSourceMap(trueNode, booleanElement) : booleanElement);
    },

    false(falseNode) {
      const arrayElement = last(stack);
      const booleanElement = new this.namespace.elements.Boolean(falseNode.value);

      arrayElement.push(this.sourceMap ? addSourceMap(falseNode, booleanElement) : booleanElement);
    },

    null(nullNode) {
      const arrayElement = last(stack);
      const nullElement = new this.namespace.elements.Null(nullNode.value);

      arrayElement.push(this.sourceMap ? addSourceMap(nullNode, nullElement) : nullElement);
    },

    array: {
      enter() {
        stack.push(new this.namespace.elements.Array());
      },
      leave() {
        this.element = stack.pop();
      }
    }
  };
};

const ObjectVisitor = () => {
  const stack =  [];

  return {
    element: null,

    property(propertyNode) {
      const objElement = last(stack);
      const { MemberElement } = this.namespace.elements.Element.prototype;
      let keyElement;
      let valueElement;

      // object property key handling
      keyElement = new this.namespace.elements.String(propertyNode.key.value);

      // object property value handling
      if (propertyNode.value.type === 'object') {
        const objectVisitor = ObjectVisitor();
        const state = { namespace: this.namespace, sourceMap: this.sourceMap };

        visit(propertyNode.value, objectVisitor, { state });

        ({ element: valueElement } = objectVisitor);
      } else if (propertyNode.value.type === 'array') {
        const arrayVisitor = ArrayVisitor();
        const state = { namespace: this.namespace, sourceMap: this.sourceMap };

        visit(propertyNode.value, arrayVisitor, { state });

        ({ element: valueElement } = arrayVisitor);
      } else if (propertyNode.key.value === '$ref') { // $ref property key special handling
        valueElement = new this.namespace.elements.Ref(propertyNode.value.value);
        valueElement.path = propertyNode.value.value;
      } else {
        valueElement = this.namespace.toElement(propertyNode.value.value);
      }

      objElement.content.push(
        new MemberElement(
          this.sourceMap ? addSourceMap(propertyNode.key, keyElement) : keyElement,
          this.sourceMap ? addSourceMap(propertyNode.value, valueElement): valueElement,
        )
      );

      return false;
    },
    object: {
      enter() {
        stack.push(new this.namespace.elements.Object());
      },
      leave() {
        this.element = stack.pop();
      }
    }
  };
};

module.exports = {
  ObjectVisitor,
  ArrayVisitor,
};
