import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  OneOfVisitorOptions,
  OneOfVisitor as OneOfVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export type { OneOfVisitorOptions };

/**
 * @public
 */
export const JSONSchemaOneOfVisitor: typeof OneOfVisitorType =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields.oneOf;

/**
 * @public
 */
class OneOfVisitor extends JSONSchemaOneOfVisitor {
  ArrayElement(arrayElement: ArrayElement) {
    const result = JSONSchemaOneOfVisitor.prototype.ArrayElement.call(this, arrayElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'schema');
    });

    return result;
  }
}

export default OneOfVisitor;
