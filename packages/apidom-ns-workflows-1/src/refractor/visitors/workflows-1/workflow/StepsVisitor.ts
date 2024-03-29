import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import WorkflowStepsElement from '../../../../elements/nces/WorkflowSteps';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface StepsVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

class StepsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: WorkflowStepsElement;

  constructor(options: StepsVisitorOptions) {
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
