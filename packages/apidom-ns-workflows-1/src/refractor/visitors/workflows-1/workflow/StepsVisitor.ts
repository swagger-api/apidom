import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import WorkflowStepsElement from '../../../../elements/nces/WorkflowSteps';
import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class StepsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: WorkflowStepsElement;

  constructor(options = {}) {
    super(options);
    this.element = new WorkflowStepsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Step'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default StepsVisitor;
