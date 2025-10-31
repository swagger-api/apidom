import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import OperationMessagesElement from '../../../../elements/nces/OperationMessage.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface OperationMessageVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * Handles the 'messages' field in Operation Object (array of references)
 */
class MessagesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: OperationMessagesElement;

  constructor(options: OperationMessageVisitorOptions) {
    super(options);
    this.element = new OperationMessagesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const specPath = ['document', 'objects', 'Reference'];
      const element = this.toRefractedElement(specPath, item);

      if (isReferenceElement(element)) {
        element.setMetaProperty('referenced-element', 'operation-messages');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default MessagesVisitor;
