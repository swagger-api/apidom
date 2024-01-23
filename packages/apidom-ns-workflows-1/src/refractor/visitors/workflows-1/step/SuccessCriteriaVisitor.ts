import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepSuccessCriteriaElement from '../../../../elements/nces/StepSuccessCriteria';
import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class SuccessCriteriaVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: StepSuccessCriteriaElement;

  constructor(options = {}) {
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
