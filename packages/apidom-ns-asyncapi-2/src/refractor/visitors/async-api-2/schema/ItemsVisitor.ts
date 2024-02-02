import { ArrayElement, ObjectElement } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft7Specification } from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

const { items: JSONSchemaItemsVisitor } =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields;

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
      // @ts-ignore
      const result = JSONSchemaItemsVisitor.compose.methods.ArrayElement.call(this, arrayElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'schema');
      });

      return result;
    },
  },
});

export default ItemsVisitor;
