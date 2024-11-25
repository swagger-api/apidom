import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  AnyOfVisitorOptions,
  AnyOfVisitor as AnyOfVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export type { AnyOfVisitorOptions };

/**
 * @public
 */
export const JSONSchemaAnyOfVisitor: typeof AnyOfVisitorType =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields.anyOf;

/**
 * @public
 */
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
