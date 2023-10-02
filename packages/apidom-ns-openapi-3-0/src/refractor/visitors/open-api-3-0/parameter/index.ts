import stampit from 'stampit';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import ParameterElement from '../../../../elements/Parameter';
import MediaTypeElement from '../../../../elements/MediaType';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isMediaTypeElement } from '../../../../predicates';

const ParameterVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Parameter']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ParameterElement();
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

export default ParameterVisitor;
