import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import WorkflowStepsElement from '../../../../elements/nces/WorkflowSteps';
import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const StepsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new WorkflowStepsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'Step'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default StepsVisitor;
