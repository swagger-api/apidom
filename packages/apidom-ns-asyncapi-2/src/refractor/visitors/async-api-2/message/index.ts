import stampit from 'stampit';
import { always, defaultTo } from 'ramda';
import { ObjectElement, isObjectElement } from '@swagger-api/apidom-core';

import mediaTypes from '../../../../media-types';
import MessageElement from '../../../../elements/Message';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import { isReferenceLikeElement } from '../../../predicates';

/**
 * Implementation of refracting according `schemaFormat` fixed field is now limited,
 * and currently only supports AsyncAPI Schema Object >= 2.0.0 <=2.5.0.
 */

const MessageVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Message']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new MessageElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
      const payload = this.element.get('payload');
      const schemaFormat = defaultTo(
        mediaTypes.latest(),
        objectElement.get('schemaFormat')?.toValue(),
      );

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
    },
  },
});

export default MessageVisitor;
