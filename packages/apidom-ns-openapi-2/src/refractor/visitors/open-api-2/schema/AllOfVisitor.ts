import stampit from 'stampit';
import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  isJSONReferenceElement,
  JSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

const { allOf: JSONSchemaAllOfVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

const AllOfVisitor = stampit(JSONSchemaAllOfVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      // @ts-ignore
      const result = JSONSchemaAllOfVisitor.compose.methods.ArrayElement.call(this, arrayElement);

      this.element
        .filter(isJSONReferenceElement)
        .forEach((referenceElement: JSONReferenceElement) => {
          referenceElement.setMetaProperty('referenced-element', 'schema');
        });

      return result;
    },
  },
});

export default AllOfVisitor;
