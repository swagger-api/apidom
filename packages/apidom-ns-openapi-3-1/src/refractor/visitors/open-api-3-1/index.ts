import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import { FixedFieldsVisitor, FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

import OpenApi3_1Element from '../../../elements/OpenApi3-1';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OpenApi']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new OpenApi3_1Element();
    this.openApiSemanticElement = this.element;
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.openApiGenericElement = objectElement;

      // @ts-ignore
      return FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
    },
  },
});

export default OpenApi3_1Visitor;
