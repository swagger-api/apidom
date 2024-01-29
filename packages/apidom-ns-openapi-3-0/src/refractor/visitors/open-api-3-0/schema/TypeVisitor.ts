import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

const { type: JSONSchemaTypeVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

const ItemsVisitor = JSONSchemaTypeVisitor.compose({
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = cloneDeep(arrayElement);
      return BREAK;
    },
  },
});

export default ItemsVisitor;
