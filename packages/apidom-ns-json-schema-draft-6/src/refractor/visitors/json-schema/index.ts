import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement, BooleanElement, BREAK } from '@swagger-api/apidom-core';
import { FixedFieldsVisitor, FallbackVisitor } from '@swagger-api/apidom-ns-json-schema-draft-4';

import JSONSchemaElement from '../../../elements/JSONSchema';

const JSONSchemaVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'JSONSchema']),
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.element = new JSONSchemaElement();

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

export default JSONSchemaVisitor;
