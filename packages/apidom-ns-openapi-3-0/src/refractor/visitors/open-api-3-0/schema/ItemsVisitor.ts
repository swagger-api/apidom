import { ArrayElement, ObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import { isReferenceElement } from '../../../../predicates';

const { items: JSONSchemaItemsVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

const ItemsVisitor = JSONSchemaItemsVisitor.compose({
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = JSONSchemaItemsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return result;
    },
    ArrayElement(arrayElement: ArrayElement) {
      this.element = cloneDeep(arrayElement);
      return BREAK;
    },
  },
});

export default ItemsVisitor;
