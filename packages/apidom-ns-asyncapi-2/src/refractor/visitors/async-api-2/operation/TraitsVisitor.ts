import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import OperationTraitsElement from '../../../../elements/nces/OperationTraits';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

class TraitsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: OperationTraitsElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new OperationTraitsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      let element;

      if (isReferenceLikeElement(item)) {
        element = this.toRefractedElement(['document', 'objects', 'Reference'], item);
        element.setMetaProperty('referenced-element', 'operationTrait');
      } else {
        element = this.toRefractedElement(['document', 'objects', 'OperationTrait'], item);
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default TraitsVisitor;
