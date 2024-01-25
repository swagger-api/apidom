import { ArrayElement, ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  JSONReferenceElement,
  isJSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

const { items: JSONSchemaItemsVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

const ItemsVisitor = JSONSchemaItemsVisitor.compose({
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = JSONSchemaItemsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      if (isJSONReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return result;
    },
    ArrayElement(arrayElement: ArrayElement) {
      // @ts-ignore
      const result = JSONSchemaItemsVisitor.compose.methods.ArrayElement.call(this, arrayElement);

      this.element
        .filter(isJSONReferenceElement)
        .forEach((referenceElement: JSONReferenceElement) => {
          referenceElement.setMetaProperty('referenced-element', 'schema');
        });

      return result;
    },
  },
});

export default ItemsVisitor;
