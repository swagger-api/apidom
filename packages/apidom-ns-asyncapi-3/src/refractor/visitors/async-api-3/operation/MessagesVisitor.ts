import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import OperationMessagesElement from '../../../../elements/nces/OperationMessages.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface OperationMessagesVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * Handles the 'messages' field in Operation Object (array of references)
 */
class MessagesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: OperationMessagesElement;

  constructor(options: OperationMessagesVisitorOptions) {
    super(options);
    this.element = new OperationMessagesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Reference'];
      const element = this.toRefractedElement(specPath, item);

      if (isReferenceElement(element)) {
        element.setMetaProperty('referenced-element', 'operation-message');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default MessagesVisitor;
