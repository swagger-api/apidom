import { map } from 'ramda';
import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import SchemaOrReferenceVisitor from './SchemaOrReferenceVisitor';

// @ts-ignore
const inheritedFixedFields = map((visitor) => {
  if (visitor === JSONSchemaDraft4Specification.visitors.JSONSchemaOrJSONReferenceVisitor) {
    return SchemaOrReferenceVisitor;
  }
  return visitor;
}, JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields);

export default inheritedFixedFields;
