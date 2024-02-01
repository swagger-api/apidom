import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepOnFailureElement from '../../../../elements/nces/StepOnFailure';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface OnFailureVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class OnFailureVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: StepOnFailureElement;

  constructor(options: OnFailureVisitorOptions) {
    super(options);
    this.element = new StepOnFailureElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'FailureAction'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default OnFailureVisitor;
