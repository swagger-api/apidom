import stampit from 'stampit';
import { ObjectElement, ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ItemsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = new ArrayElement();
      this.element.classes.push('json-schema-items');

      arrayElement.forEach((item: Element): void => {
        const specPath = isReferenceLikeElement(item)
          ? ['document', 'objects', 'Reference']
          : ['document', 'objects', 'Schema'];
        const element = this.toRefractedElement(specPath, item);

        if (isReferenceElement(element)) {
          element.setMetaProperty('referenced-element', 'schema');
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
    ObjectElement(objectElement: ObjectElement) {
      const specPath = isReferenceLikeElement(objectElement)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Schema'];

      this.element = this.toRefractedElement(specPath, objectElement);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return BREAK;
    },
  },
});

export default ItemsVisitor;
