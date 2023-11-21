import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FailureActionCriteriaElement from '../../../elements/nces/FailureActionCriteria';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

const FailureActionCriteriaVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new FailureActionCriteriaElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'Criterion'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default FailureActionCriteriaVisitor;
