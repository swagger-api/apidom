import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  isJSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

const { JSONSchemaOrJSONReferenceVisitor } = JSONSchemaDraft4Specification.visitors;

const SchemaOrJSONReferenceVisitor = JSONSchemaOrJSONReferenceVisitor.compose({
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = JSONSchemaOrJSONReferenceVisitor.compose.methods.enter.call(
        this,
        objectElement,
      );

      if (isJSONReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return result;
    },
  },
});

export default SchemaOrJSONReferenceVisitor;
