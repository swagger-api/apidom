'use strict';

const { last } = require('ramda');
const { isNotNull } = require('ramda-adjunct');
const { addSourceMap } = require('../source-map');
const { visit, BREAK } = require('../visitor');
const { isOpenApiExtension } = require('../predicates');

const ArrayVisitor = () => {
  const stack = [];
  const createStatefulValueVisitor = ({ namespace, sourceMap }) => {
    return Object.assign({}, ValueVisitor(), { namespace, sourceMap });
  };

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
      const valueVisitor = createStatefulValueVisitor(this);

      valueVisitor.string(stringNode);
      arrayElement.push(valueVisitor.element);
    },

    number(numberNode) {
      const arrayElement = last(stack);
      const valueVisitor = createStatefulValueVisitor(this);

      valueVisitor.number(numberNode);
      arrayElement.push(valueVisitor.element);
    },

    true(trueNode) {
      const arrayElement = last(stack);
      const valueVisitor = createStatefulValueVisitor(this);

      valueVisitor.true(trueNode);
      arrayElement.push(valueVisitor.element);
    },

    false(falseNode) {
      const arrayElement = last(stack);
      const valueVisitor = createStatefulValueVisitor(this);

      valueVisitor.false(falseNode);
      arrayElement.push(valueVisitor.element);
    },

    null(nullNode) {
      const arrayElement = last(stack);
      const valueVisitor = createStatefulValueVisitor(this);

      valueVisitor.null(nullNode);
      arrayElement.push(valueVisitor.element);
    },

    array: {
      enter() {
        const arrayElement = new this.namespace.elements.Array();

        stack.push(arrayElement);

        if (isNotNull(this.element)) {
          this.element.push(arrayElement);
        } else {
          this.element = arrayElement;
        }
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
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      let valueElement;

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
      } else if (!isOpenApiExtension({}, propertyNode)) {
        valueElement = this.namespace.toElement(propertyNode.value.value);
      }

      /**
       * @todo(vladimir.gorej@gmail.com): we have a circular dependency here which needs to be eliminated in future.
       */
      if (isOpenApiExtension({}, propertyNode)) {
        const { parseOpenApiExtension } = require('../parsers/open-api-extension');

        objElement.content.push(
          parseOpenApiExtension(
            { namespace: this.namespace, sourceMap: this.sourceMap },
            propertyNode
          )
        );
      } else {
        objElement.content.push(
          new MemberElement(
            this.sourceMap ? addSourceMap(propertyNode.key, keyElement) : keyElement,
            this.sourceMap ? addSourceMap(propertyNode.value, valueElement): valueElement,
          )
        );
      }

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

const ValueVisitor = () => ({
  element: null,

  array(arrayNode) {
    const state = { namespace: this.namespace, sourceMap: this.sourceMap };
    const arrayVisitor = ArrayVisitor();

    visit(arrayNode, arrayVisitor, { state });

    this.element = arrayVisitor.element;

    return BREAK;
  },

  object(objectNode) {
    const state = { namespace: this.namespace, sourceMap: this.sourceMap };
    const objectVisitor = ObjectVisitor();

    visit(objectNode, objectVisitor, { state });

    this.element = objectVisitor.element;

    return BREAK;
  },

  string(stringNode) {
    const stringElement = new this.namespace.elements.String(stringNode.value);
    this.element = this.sourceMap ? addSourceMap(stringNode, stringElement) : stringElement;
    return BREAK;
  },

  number(numberNode) {
    const numberElement = new this.namespace.elements.Number(Number(numberNode.value));
    this.element = this.sourceMap ? addSourceMap(numberNode, numberElement) : numberElement;
    return BREAK;
  },

  true(trueNode) {
    const booleanElement = new this.namespace.elements.Boolean(trueNode.value);
    this.element = this.sourceMap ? addSourceMap(trueNode, booleanElement) : booleanElement;
    return BREAK;
  },

  false(falseNode) {
    const booleanElement = new this.namespace.elements.Boolean(falseNode.value);
    this.element = this.sourceMap ? addSourceMap(falseNode, booleanElement) : booleanElement;
    return BREAK;
  },

  null(nullNode) {
    const nullElement = new this.namespace.elements.Null(nullNode.value);
    this.element = this.sourceMap ? addSourceMap(nullNode, nullElement) : nullElement;
    return BREAK;
  },
});

module.exports = {
  ObjectVisitor,
  ArrayVisitor,
  ValueVisitor,
};
