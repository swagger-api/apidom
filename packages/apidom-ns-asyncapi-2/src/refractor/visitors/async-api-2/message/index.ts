import { Mixin } from 'ts-mixer';
import { always, defaultTo } from 'ramda';
import { ObjectElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

import mediaTypes from '../../../../media-types';
import MessageElement from '../../../../elements/Message';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

/**
 * Implementation of refracting according `schemaFormat` fixed field is now limited,
 * and currently only supports AsyncAPI Schema Object >= 2.0.0 <=2.6.0.
 */
export interface MessageVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class MessageVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MessageElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Message']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: MessageVisitorOptions) {
    super(options);
    this.element = new MessageElement();
    this.specPath = always(['document', 'objects', 'Message']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
    const payload = this.element.get('payload');
    const schemaFormat = defaultTo(mediaTypes.latest(), toValue(objectElement.get('schemaFormat')));

    if (mediaTypes.includes(schemaFormat) && isReferenceLikeElement(payload)) {
      // refract to ReferenceElement
      const referenceElement = this.toRefractedElement(
        ['document', 'objects', 'Reference'],
        payload,
      );
      referenceElement.meta.set('referenced-element', 'schema');
      this.element.payload = referenceElement;
    } else if (mediaTypes.includes(schemaFormat) && isObjectElement(this.element.payload)) {
      this.element.payload = this.toRefractedElement(['document', 'objects', 'Schema'], payload);
    }

    return result;
  }
}

export default MessageVisitor;
