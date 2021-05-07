import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import OpenApi3_1Element from '../../../elements/OpenApi3-1';

const OpenApi3_1Visitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OpenApi']),
    canSupportSpecificationExtensions: true,
    unrefractedElement: null,
    openApi3_1Element: null,
  },
  init() {
    this.element = new OpenApi3_1Element();
    this.openApi3_1Element = this.element;
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.unrefractedElement = objectElement;

      // @ts-ignore
      return FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
    },
  },
});

export default OpenApi3_1Visitor;
