import stampit from 'stampit';
import { ArrayElement, BREAK } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

const { type: JSONSchemaTypeVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

const ItemsVisitor = stampit(JSONSchemaTypeVisitor, {
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = arrayElement.clone();
      return BREAK;
    },
  },
});

export default ItemsVisitor;
