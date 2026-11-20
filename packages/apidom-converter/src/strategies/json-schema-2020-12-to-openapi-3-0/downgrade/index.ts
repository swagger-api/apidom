import {
  Element,
  cloneDeep,
  isBooleanElement,
  isObjectElement,
  isStringElement,
} from '@swagger-api/apidom-core';
import { ReferenceElement, SchemaElement } from '@swagger-api/apidom-ns-openapi-3-0';

import applyValueRules, { booleanSchemaToObject, convertBooleanSubschemas } from './value-rules.ts';
import applyStructureRules from './structure-rules.ts';
import { IdentifierIndex, rewriteIdentifierRefs, splitRefSiblings } from './refs.ts';
import { walkSchemas } from './walk.ts';
import type { Warnings } from './warnings.ts';

export { default as needsDowngrade } from './detect.ts';
export { createWarnings } from './warnings.ts';
export type { Warnings } from './warnings.ts';
export { buildIdentifierIndex, baseURIAt, rewriteIdentifierRefs } from './refs.ts';
export type { IdentifierIndex } from './refs.ts';

/**
 * Where the schema lives, so `$ref`s to `$anchor`s and `$id`s of its document can be rewritten
 * into JSON Pointers.
 */
export interface DowngradeLocation {
  readonly documentURI: string;
  readonly baseURI: string;
  readonly index: IdentifierIndex;
}

/**
 * Converts one schema (generic, OpenAPI 3.0/3.1 or JSON Schema element) into an OpenAPI 3.0
 * Schema Object, or into a Reference Object when only a `$ref` is left, so that the dereference
 * follows it. The input is not mutated.
 */
const downgradeSchema = (
  schema: Element,
  warnings: Warnings,
  location?: DowngradeLocation,
): SchemaElement | ReferenceElement => {
  const copy = cloneDeep(schema);
  const root = isBooleanElement(copy) ? booleanSchemaToObject(copy) : copy;

  if (location !== undefined) {
    rewriteIdentifierRefs(root, location.baseURI, location.documentURI, location.index, warnings);
  }

  walkSchemas(root, (node) => {
    if (!isObjectElement(node)) return;
    convertBooleanSubschemas(node);
    applyStructureRules(node, warnings);
    applyValueRules(node, warnings);
    splitRefSiblings(node);
  });

  if (isObjectElement(root) && root.length === 1 && isStringElement(root.get('$ref'))) {
    const reference = ReferenceElement.refract(root) as ReferenceElement;
    reference.setMetaProperty('referenced-element', 'schema');
    return reference;
  }

  return SchemaElement.refract(root) as SchemaElement;
};

export default downgradeSchema;
