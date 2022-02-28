import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';

const ScenariosVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('main-scenarios');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'Scenario'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default ScenariosVisitor;
