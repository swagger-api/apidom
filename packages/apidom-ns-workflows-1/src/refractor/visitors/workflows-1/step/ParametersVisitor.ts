import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import StepParametersElement from '../../../../elements/nces/StepParameters';

class ParametersVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: StepParametersElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new StepParametersElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = isReferenceLikeElement(item)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Parameter'];
      const element = this.toRefractedElement(specPath, item);

      if (isReferenceElement(element)) {
        element.setMetaProperty('referenced-element', 'parameter');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ParametersVisitor;
