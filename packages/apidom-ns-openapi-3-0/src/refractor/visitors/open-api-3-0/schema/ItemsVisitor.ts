import { ArrayElement, ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  ItemsVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import { isReferenceElement } from '../../../../predicates';

export type { ItemsVisitorOptions };

const { items: JSONSchemaItemsVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

class ItemsVisitor extends JSONSchemaItemsVisitor {
  ObjectElement(objectElement: ObjectElement) {
    const result = JSONSchemaItemsVisitor.prototype.ObjectElement.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'schema');
    }

    return result;
  }

  ArrayElement(arrayElement: ArrayElement) {
    const result = this.enter(arrayElement);
    return result;
  }
}

export default ItemsVisitor;
