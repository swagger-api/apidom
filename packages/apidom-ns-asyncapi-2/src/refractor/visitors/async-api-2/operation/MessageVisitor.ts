import { Mixin } from 'ts-mixer';
import { ObjectElement, isArrayElement, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import OperationMessageMapElement from '../../../../elements/nces/OperationMessageMap';
import OperationMessageElement from '../../../../elements/nces/OperationMessage';

export interface MessageVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class MessageVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: OperationMessageMapElement;

  ObjectElement(objectElement: ObjectElement) {
    if (isReferenceLikeElement(objectElement)) {
      this.element = this.toRefractedElement(['document', 'objects', 'Reference'], objectElement);
      this.element.setMetaProperty('referenced-element', 'message');
    } else if (isArrayElement(objectElement.get('oneOf'))) {
      this.element = new OperationMessageMapElement();
      const operationMessageElement = new OperationMessageElement();

      objectElement.get('oneOf').forEach((item: ObjectElement) => {
        let element;

        if (isReferenceLikeElement(item)) {
          element = this.toRefractedElement(['document', 'objects', 'Reference'], item);
          element.setMetaProperty('referenced-element', 'message');
        } else {
          element = this.toRefractedElement(['document', 'objects', 'Message'], item);
        }

        operationMessageElement.push(element);
      });

      this.element.oneOf = operationMessageElement;
    } else {
      this.element = this.toRefractedElement(['document', 'objects', 'Message'], objectElement);
    }

    this.copyMetaAndAttributes(objectElement, this.element);

    return BREAK;
  }
}

export default MessageVisitor;
