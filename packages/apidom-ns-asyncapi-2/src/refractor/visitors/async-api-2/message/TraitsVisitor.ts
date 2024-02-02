import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import MessageTraitsElement from '../../../../elements/nces/MessageTraits';

class TraitsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: MessageTraitsElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new MessageTraitsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      let element;

      if (isReferenceLikeElement(item)) {
        element = this.toRefractedElement(['document', 'objects', 'Reference'], item);
        element.setMetaProperty('referenced-element', 'messageTrait');
      } else {
        element = this.toRefractedElement(['document', 'objects', 'MessageTrait'], item);
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default TraitsVisitor;
