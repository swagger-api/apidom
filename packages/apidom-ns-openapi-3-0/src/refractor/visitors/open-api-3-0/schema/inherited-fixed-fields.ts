import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import SchemaOrReferenceVisitor from './SchemaOrReferenceVisitor';

const inheritedFixedFields = Object.fromEntries(
  Object.entries(
    JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields,
  ).map(([fieldName, visitor]) => {
    if (visitor === JSONSchemaDraft4Specification.visitors.JSONSchemaOrJSONReferenceVisitor) {
      return [fieldName, SchemaOrReferenceVisitor];
    }
    return [fieldName, visitor];
  }),
);

export default inheritedFixedFields;
