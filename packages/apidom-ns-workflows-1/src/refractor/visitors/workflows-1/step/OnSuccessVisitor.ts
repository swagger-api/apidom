import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepOnSuccessElement from '../../../../elements/nces/StepOnSuccess';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface OnSuccessVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class OnSuccessVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: StepOnSuccessElement;

  constructor(options: OnSuccessVisitorOptions) {
    super(options);
    this.element = new StepOnSuccessElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'SuccessAction'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default OnSuccessVisitor;
