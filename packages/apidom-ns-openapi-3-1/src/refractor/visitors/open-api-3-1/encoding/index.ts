import stampit from 'stampit';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement } from '@swagger-api/apidom-core';
import { EncodingElement } from '@swagger-api/apidom-ns-openapi-3-0';

import HeaderElement from '../../../../elements/Header';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import { isHeaderElement } from '../../../../predicates';

const EncodingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Encoding']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new EncodingElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every Header with media type metadata
      if (isObjectElement(this.element.headers)) {
        this.element.headers
          .filter(isHeaderElement)
          .forEach((headerElement: HeaderElement, key: StringElement) => {
            headerElement.setMetaProperty('header-name', key.toValue());
          });
      }

      return result;
    },
  },
});

export default EncodingVisitor;
