import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import PathItemParametersElement from '../../../../elements/nces/PathItemParameters';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ParametersVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: PathItemParametersElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new PathItemParametersElement();
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
