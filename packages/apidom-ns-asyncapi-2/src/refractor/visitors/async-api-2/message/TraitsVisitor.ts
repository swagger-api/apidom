import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import MessageTraitsElement from '../../../../elements/nces/MessageTraits.ts';

/**
 * @public
 */
export interface TraitsVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class TraitsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: MessageTraitsElement;

  constructor(options: TraitsVisitorOptions) {
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
