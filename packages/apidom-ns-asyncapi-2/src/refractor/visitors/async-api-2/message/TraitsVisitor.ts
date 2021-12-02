import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import MessageTraitsElement from '../../../../elements/nces/MessageTraits';

const TraitsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new MessageTraitsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        let element;

        if (isReferenceLikeElement(item)) {
          element = this.toRefractedElement(['document', 'objects', 'Reference'], item);
          element.setMetaProperty('referenced-element', 'messageTrait');
        } else {
          element = this.toRefractedElement(['document', 'objects', 'MessageTrait'], item);
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default TraitsVisitor;
