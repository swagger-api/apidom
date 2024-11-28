import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepSuccessCriteriaElement from '../../../../elements/nces/StepSuccessCriteria.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SuccessCriteriaVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SuccessCriteriaVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: StepSuccessCriteriaElement;

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
