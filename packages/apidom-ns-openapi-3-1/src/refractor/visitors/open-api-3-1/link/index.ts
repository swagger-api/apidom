import stampit from 'stampit';
import { always } from 'ramda';
import { isStringElement, ObjectElement } from '@swagger-api/apidom-core';

import LinkElement from '../../../../elements/Link';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const LinkVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Link']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new LinkElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // mark this LinkElement with reference metadata
      if (isStringElement(this.element.operationId) || isStringElement(this.element.operationRef)) {
        this.element.classes.push('reference-element');
      }

      return result;
    },
  },
});

export default LinkVisitor;
