import stampit from 'stampit';
import { always, defaultTo } from 'ramda';
import { ObjectElement, isObjectElement, Element } from '@swagger-api/apidom-core';

import mediaTypes from '../../../../media-types';
import MessageElement from '../../../../elements/Message';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import { isReferenceLikeElement } from '../../../predicates';

const MessageVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Message']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new MessageElement();
  },
  methods: {
    refractPayload(schemaFormat: string, payload: Element) {
      if (isObjectElement(payload) && mediaTypes.includes(schemaFormat)) {
        this.element.payload = this.toRefractedElement(['document', 'objects', 'Schema'], payload);
      }
    },

    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
      const payload = this.element.get('payload');

      if (isReferenceLikeElement(payload)) {
        // refract to ReferenceElement
        this.element.payload = this.toRefractedElement(
          ['document', 'objects', 'Reference'],
          payload,
        );
      } else {
        // refract payload according to `schemaFormat`
        const schemaFormat = defaultTo(
          mediaTypes.latest(),
          objectElement.get('schemaFormat')?.toValue(),
        );
        this.refractPayload(schemaFormat, payload);
      }

      return result;
    },
  },
});

export default MessageVisitor;
