import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  AllOfVisitorOptions,
  AllOfVisitor as AllOfVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export type { AllOfVisitorOptions };

/**
 * @public
 */
export const JSONSchemaAllOfVisitor: typeof AllOfVisitorType =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields.allOf;

/**
 * @public
 */
class AllOfVisitor extends JSONSchemaAllOfVisitor {
  ArrayElement(arrayElement: ArrayElement) {
    const result = JSONSchemaAllOfVisitor.prototype.ArrayElement.call(this, arrayElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'schema');
    });

    return result;
  }
}

export default AllOfVisitor;
