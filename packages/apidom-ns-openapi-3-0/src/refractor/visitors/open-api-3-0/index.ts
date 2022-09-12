import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import OpenApi3_0Element from '../../../elements/OpenApi3-0';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OpenApi']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new OpenApi3_0Element();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.unrefractedElement = objectElement;

      // @ts-ignore
      return FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
    },
  },
});

export default OpenApi3_0Visitor;
