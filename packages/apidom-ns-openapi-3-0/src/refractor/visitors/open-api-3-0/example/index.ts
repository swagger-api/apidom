import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import ExampleElement from '../../../../elements/Example';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ExampleVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Example']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ExampleElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // mark this ExampleElement with reference metadata
      if (isStringElement(this.element.externalValue)) {
        this.element.classes.push('reference-element');
      }

      return result;
    },
  },
});

export default ExampleVisitor;
