import { ArrayElement, ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  JSONReferenceElement,
  isJSONReferenceElement,
  ItemsVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export type { ItemsVisitorOptions };

const { items: JSONSchemaItemsVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

class ItemsVisitor extends JSONSchemaItemsVisitor {
  ObjectElement(objectElement: ObjectElement) {
    const result = JSONSchemaItemsVisitor.prototype.ObjectElement.call(this, objectElement);

    if (isJSONReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'schema');
    }

    return result;
  }

  ArrayElement(arrayElement: ArrayElement) {
    const result = JSONSchemaItemsVisitor.prototype.ArrayElement.call(this, arrayElement);

    this.element
      .filter(isJSONReferenceElement)
      // @ts-ignore
      .forEach((referenceElement: JSONReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'schema');
      });

    return result;
  }
}

export default ItemsVisitor;
