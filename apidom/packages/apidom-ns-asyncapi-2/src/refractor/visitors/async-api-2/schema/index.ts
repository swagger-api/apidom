import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement, BooleanElement, BREAK } from 'apidom';

import SchemaElement from '../../../../elements/Schema';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const SchemaVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
    canSupportSpecificationExtensions: true,
  },

  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.element = new SchemaElement();

      // @ts-ignore
      return FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
    },

    BooleanElement(booleanElement: BooleanElement) {
      this.element = booleanElement.clone();
      this.element.classes.push('boolean-json-schema');

      return BREAK;
    },
  },
});

export default SchemaVisitor;
