import stampit from 'stampit';
import { ObjectElement } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import { isReferenceElement } from '../../../../predicates';

const { JSONSchemaOrJSONReferenceVisitor } = JSONSchemaDraft4Specification.visitors;

const SchemaOrReferenceVisitor = stampit(JSONSchemaOrJSONReferenceVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = JSONSchemaOrJSONReferenceVisitor.compose.methods.enter.call(
        this,
        objectElement,
      );

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return result;
    },
  },
});

export default SchemaOrReferenceVisitor;
