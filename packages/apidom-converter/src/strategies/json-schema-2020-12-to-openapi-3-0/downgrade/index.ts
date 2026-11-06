import { Element, cloneDeep, isBooleanElement, isObjectElement } from '@swagger-api/apidom-core';
import { SchemaElement } from '@swagger-api/apidom-ns-openapi-3-0';

import applyValueRules, { booleanSchemaToObject } from './value-rules.ts';
import { walkSchemas } from './walk.ts';
import type { Warnings } from './warnings.ts';

export { default as needsDowngrade } from './detect.ts';
export { createWarnings } from './warnings.ts';
export type { Warnings } from './warnings.ts';

/**
 * Converts one schema (generic, OpenAPI 3.0/3.1 or JSON Schema element) into an OpenAPI 3.0
 * Schema Object. The input is not mutated.
 */
const downgradeSchema = (schema: Element, warnings: Warnings): SchemaElement => {
  const copy = cloneDeep(schema);
  const root = isBooleanElement(copy) ? booleanSchemaToObject(copy) : copy;

  walkSchemas(root, (node) => {
    if (isObjectElement(node)) applyValueRules(node, warnings);
  });

  return SchemaElement.refract(root) as SchemaElement;
};

export default downgradeSchema;
