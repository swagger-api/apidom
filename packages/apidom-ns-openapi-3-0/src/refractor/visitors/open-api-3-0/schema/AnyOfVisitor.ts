import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  AnyOfVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

export type { AnyOfVisitorOptions };

const { anyOf: JSONSchemaAnyOfVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

class AnyOfVisitor extends JSONSchemaAnyOfVisitor {
  ArrayElement(arrayElement: ArrayElement) {
    const result = JSONSchemaAnyOfVisitor.prototype.ArrayElement.call(this, arrayElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'schema');
    });

    return result;
  }
}

export default AnyOfVisitor;
