import {
  Element,
  ObjectElement,
  isArrayElement,
  isBooleanElement,
  isNumberElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';

import { TRIGGER_KEYWORDS } from './keywords.ts';
import { subschemaPositions } from './walk.ts';

/**
 * A `$ref` that is not a plain JSON Pointer reference: an `$anchor` (`#name`) or a bare URI
 * that may name an `$id`.
 */
export const isNonPointerRef = (ref: string): boolean => {
  const hashIndex = ref.indexOf('#');
  if (hashIndex === -1) return false;
  const fragment = ref.slice(hashIndex + 1);
  return fragment !== '' && !fragment.startsWith('/');
};

const isOwnConstructInvalid = (schema: ObjectElement): boolean => {
  const keys = schema.keys().map(String);

  if (keys.some((key) => TRIGGER_KEYWORDS.has(key))) return true;

  const type = schema.get('type');
  if (isArrayElement(type)) return true;
  if (isStringElement(type) && toValue(type) === 'null') return true;

  const exclusiveMinimum = schema.get('exclusiveMinimum');
  const exclusiveMaximum = schema.get('exclusiveMaximum');
  if (isNumberElement(exclusiveMinimum) || isNumberElement(exclusiveMaximum)) return true;

  if (isArrayElement(schema.get('items'))) return true;

  const required = schema.get('required');
  if (isArrayElement(required) && required.length === 0) return true;

  const ref = schema.get('$ref');
  if (isStringElement(ref) && isNonPointerRef(toValue(ref))) return true;

  return subschemaPositions(schema).some(
    (position) => isBooleanElement(position.element) && position.keyword !== 'additionalProperties',
  );
};

/**
 * Whether a schema, or any of its subschemas, contains a construct that is invalid in an
 * OpenAPI 3.0 Schema Object and that the downgrade rules handle. Only schema positions are
 * inspected; data such as `example`, `default`, `enum` or extensions is never treated as schema.
 */
const needsDowngrade = (schema: Element): boolean => {
  if (isBooleanElement(schema)) return true;
  if (!isObjectElement(schema)) return false;
  if (isOwnConstructInvalid(schema)) return true;

  return subschemaPositions(schema).some(
    (position) => isObjectElement(position.element) && needsDowngrade(position.element),
  );
};

export default needsDowngrade;
