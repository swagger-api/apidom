import { Mixin } from 'ts-mixer';
import { always, defaultTo, includes } from 'ramda';
import { ObjectElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

import mediaTypes from '../../../../media-types.ts';
import MessageElement from '../../../../elements/Message.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';


/**
 * Implementation of refracting according `schemaFormat` fixed field is now limited,
 * and currently only supports `AsyncAPI Schema Object >= 2.0.0 <=2.6.0.`
 * @public
 */
export interface MessageVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class MessageVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MessageElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Message']>;

  declare protected readonly canSupportSpecificationExtensions: true;

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
    const multiFormatSchema = objectElement.hasKey('multiFormatSchema') ? objectElement.get('multiFormatSchema') : undefined;
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
    } else if (mediaTypes.includes(multiFormatSchema)) {
       this.element.payload = this.toRefractedElement(['document', 'objects', 'MultiformatSchema'], payload);
    } 
  
    return result;
  }
}

export default MessageVisitor;
