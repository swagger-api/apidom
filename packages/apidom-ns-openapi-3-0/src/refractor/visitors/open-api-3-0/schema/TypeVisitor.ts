import { ArrayElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  TypeVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export type { TypeVisitorOptions };

const { type: JSONSchemaTypeVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

class TypeVisitor extends JSONSchemaTypeVisitor {
  ArrayElement(arrayElement: ArrayElement) {
    const result = this.enter(arrayElement);
    return result;
  }
}

export default TypeVisitor;
