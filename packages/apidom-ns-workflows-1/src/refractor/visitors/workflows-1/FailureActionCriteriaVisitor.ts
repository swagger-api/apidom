import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FailureActionCriteriaElement from '../../../elements/nces/FailureActionCriteria';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

class FailureActionCriteriaVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: FailureActionCriteriaElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new FailureActionCriteriaElement();
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

export default FailureActionCriteriaVisitor;
