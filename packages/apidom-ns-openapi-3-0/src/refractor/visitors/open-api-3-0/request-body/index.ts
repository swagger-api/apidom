import stampit from 'stampit';
import { always } from 'ramda';
import { StringElement, ObjectElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

import RequestBodyElement from '../../../../elements/RequestBody';
import MediaTypeElement from '../../../../elements/MediaType';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isMediaTypeElement } from '../../../../predicates';

const RequestBodyVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'RequestBody']),
  },
  init() {
    this.element = new RequestBodyElement();
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

      return result;
    },
  },
});

export default RequestBodyVisitor;
