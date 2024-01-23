import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import StepOnFailureElement from '../../../../elements/nces/StepOnFailure';
import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class OnFailureVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: StepOnFailureElement;

  constructor(options = {}) {
    super(options);
    this.element = new StepOnFailureElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'FailureAction'];
      const element = this.toRefractedElement(specPath, item);

      // @ts-ignore
      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default OnFailureVisitor;
