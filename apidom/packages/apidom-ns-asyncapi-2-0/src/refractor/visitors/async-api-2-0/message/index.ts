import stampit from 'stampit';
import { always, defaultTo } from 'ramda';
import { ObjectElement, isObjectElement, Element } from 'apidom';

import MessageElement from '../../../../elements/Message';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

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
        ].includes(schemaFormat) &&
        isObjectElement(payload)
      ) {
        this.element.payload = this.toRefractedElement(['document', 'objects', 'Schema'], payload);
      }
    },

    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // refract payload according to `schemaFormat`
      const schemaFormat = defaultTo(
        'application/vnd.aai.asyncapi;version=2.0.0',
        objectElement.get('schemaFormat')?.toValue(),
      );
      const payload = this.element.get('payload');
      this.refractPayload(schemaFormat, payload);

      return result;
    },
  },
});

export default MessageVisitor;
