import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepSuccessCriteriaElement from '../../../elements/nces/StepSuccessCriteria';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

const StepSuccessCriteriaVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new StepSuccessCriteriaElement();
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

export default StepSuccessCriteriaVisitor;
