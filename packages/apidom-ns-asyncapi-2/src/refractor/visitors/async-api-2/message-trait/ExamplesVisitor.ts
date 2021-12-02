import stampit from 'stampit';
import { ArrayElement, Element, isObjectElement, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import MessageTraitExamplesElement from '../../../../elements/nces/MessageTraitExamples';

const ExamplesVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new MessageTraitExamplesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        let element;

        if (isObjectElement(item)) {
          element = this.toRefractedElement(['document', 'objects', 'MessageExample'], item);
        } else {
          element = item.clone();
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default ExamplesVisitor;
