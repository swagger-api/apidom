import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ReferenceVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Reference']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new ReferenceElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // mark this ReferenceElement with reference metadata
      if (isStringElement(this.element.$ref)) {
        this.element.classes.push('reference-element');
      }

      return result;
    },
  },
});

export default ReferenceVisitor;
