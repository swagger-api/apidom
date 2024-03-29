import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepSuccessCriteriaElement from '../../../../elements/nces/StepSuccessCriteria';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface SuccessCriteriaVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class SuccessCriteriaVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: StepSuccessCriteriaElement;

  constructor(options: SuccessCriteriaVisitorOptions) {
    super(options);
    this.element = new StepSuccessCriteriaElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Criterion'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SuccessCriteriaVisitor;
