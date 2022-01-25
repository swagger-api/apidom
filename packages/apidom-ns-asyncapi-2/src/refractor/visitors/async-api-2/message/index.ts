import stampit from 'stampit';
import { always, defaultTo } from 'ramda';
import { ObjectElement, isObjectElement, Element } from '@swagger-api/apidom-core';

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
      if (
        [
          'application/vnd.aai.asyncapi;version=2.0.0',
          'application/vnd.aai.asyncapi+json;version=2.0.0',
          'application/vnd.aai.asyncapi+yaml;version=2.0.0',
          'application/vnd.aai.asyncapi;version=2.1.0',
          'application/vnd.aai.asyncapi+json;version=2.1.0',
          'application/vnd.aai.asyncapi+yaml;version=2.1.0',
          'application/vnd.aai.asyncapi;version=2.2.0',
          'application/vnd.aai.asyncapi+json;version=2.2.0',
          'application/vnd.aai.asyncapi+yaml;version=2.2.0',
        ].includes(schemaFormat) &&
        isObjectElement(payload)
      ) {
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
          'application/vnd.aai.asyncapi;version=2.2.0',
          objectElement.get('schemaFormat')?.toValue(),
        );
        this.refractPayload(schemaFormat, payload);
      }

      return result;
    },
  },
});

export default MessageVisitor;
