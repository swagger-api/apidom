import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceElement } from '@swagger-api/apidom-ns-asyncapi-2';
import OperationMessagesElement from '../../../../elements/nces/OperationMessage.ts';

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
      
      let element;
      if (isReferenceElement(item)) {
        element = this.toRefractedElement(['document', 'objects', 'Messages'], item);
        element.setMetaProperty('referenced-element', 'operationMessages')
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default MessagesVisitor;