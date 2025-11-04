import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import { isReferenceElement } from '@swagger-api/apidom-ns-asyncapi-2';

import OperationReplyMessagesElement from '../../../../elements/nces/OperationReplyMessage.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MessagesVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MessagesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: OperationReplyMessagesElement;

  constructor(options: MessagesVisitorOptions) {
    super(options);
    this.element = new OperationReplyMessagesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Reference'];
      const element = this.toRefractedElement(specPath, item);

      if (isReferenceElement(element)) {
        element.setMetaProperty('referenced-element', 'operation-reply-messages');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default MessagesVisitor;
