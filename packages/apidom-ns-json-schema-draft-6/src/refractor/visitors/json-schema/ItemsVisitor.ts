import stampit from 'stampit';
import {
  ObjectElement,
  ArrayElement,
  BooleanElement,
  Element,
  BREAK,
} from '@swagger-api/apidom-core';
import {
  SpecificationVisitor,
  FallbackVisitor,
  ParentSchemaAwareVisitor,
  isJSONReferenceLikeElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

const ItemsVisitor = stampit(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      const specPath = isJSONReferenceLikeElement(objectElement)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'JSONSchema'];
      this.element = this.toRefractedElement(specPath, objectElement);

      return BREAK;
    },
    ArrayElement(arrayElement: ArrayElement) {
      this.element = new ArrayElement();
      this.element.classes.push('json-schema-items');

      arrayElement.forEach((item: Element): void => {
        const specPath = isJSONReferenceLikeElement(item)
          ? ['document', 'objects', 'JSONReference']
          : ['document', 'objects', 'JSONSchema'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
    BooleanElement(booleanElement: BooleanElement) {
      this.element = this.toRefractedElement(['document', 'objects', 'JSONSchema'], booleanElement);

      return BREAK;
    },
  },
});

export default ItemsVisitor;
