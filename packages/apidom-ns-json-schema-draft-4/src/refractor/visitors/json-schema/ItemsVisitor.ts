import stampit from 'stampit';
import { ObjectElement, ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

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
  },
});

export default ItemsVisitor;
