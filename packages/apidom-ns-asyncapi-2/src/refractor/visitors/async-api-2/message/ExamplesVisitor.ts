import stampit from 'stampit';
import { ArrayElement, Element, isObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import MessageExamplesElement from '../../../../elements/nces/MessageExamples';

const ExamplesVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new MessageExamplesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        let element;

        if (isObjectElement(item)) {
          element = this.toRefractedElement(['document', 'objects', 'MessageExample'], item);
        } else {
          element = cloneDeep(item);
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default ExamplesVisitor;
