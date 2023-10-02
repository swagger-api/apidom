import stampit from 'stampit';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import ResponseElement from '../../../../elements/Response';
import MediaTypeElement from '../../../../elements/MediaType';
import HeaderElement from '../../../../elements/Header';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isHeaderElement, isMediaTypeElement } from '../../../../predicates';

const ResponseVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Response']),
  },
  init() {
    this.element = new ResponseElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every MediaTypeElement with media type metadata
      if (isObjectElement(this.element.contentProp)) {
        this.element.contentProp
          .filter(isMediaTypeElement)
          .forEach((mediaTypeElement: MediaTypeElement, key: StringElement) => {
            mediaTypeElement.setMetaProperty('media-type', toValue(key));
          });
      }

      // decorate every MediaTypeElement with media type metadata
      if (isObjectElement(this.element.headers)) {
        this.element.headers
          .filter(isHeaderElement)
          .forEach((headerElement: HeaderElement, key: StringElement) => {
            headerElement.setMetaProperty('header-name', toValue(key));
          });
      }

      return result;
    },
  },
});

export default ResponseVisitor;
