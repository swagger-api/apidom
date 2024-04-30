import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  isJSONReferenceElement,
  JSONReferenceElement,
  AllOfVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export type { AllOfVisitorOptions };

const { allOf: JSONSchemaAllOfVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

class AllOfVisitor extends JSONSchemaAllOfVisitor {
  ArrayElement(arrayElement: ArrayElement) {
    const result = JSONSchemaAllOfVisitor.prototype.ArrayElement.call(this, arrayElement);

    this.element
      .filter(isJSONReferenceElement)
      // @ts-ignore
      .forEach((referenceElement: JSONReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'schema');
      });

    return result;
  }
}

export default AllOfVisitor;
