import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';

const StandardsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('main-standards');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'Standard'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default StandardsVisitor;
