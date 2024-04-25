import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  OneOfVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

export type { OneOfVisitorOptions };

const { oneOf: JSONSchemaOneOfVisitor } =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields;

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
