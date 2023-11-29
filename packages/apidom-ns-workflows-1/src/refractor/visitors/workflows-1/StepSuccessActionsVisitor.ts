import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepSuccessActionsElement from '../../../elements/nces/StepSuccessActions';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

const StepSuccessActionsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new StepSuccessActionsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'SuccessAction'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default StepSuccessActionsVisitor;
