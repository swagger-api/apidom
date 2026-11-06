import {
  ArrayElement,
  BooleanElement,
  Element,
  NullElement,
  ObjectElement,
  cloneDeep,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isNumberElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';

import { DROPPED_KEYWORDS, IDENTIFIER_KEYWORDS, TYPE_SPECIFIC_KEYWORDS } from './keywords.ts';
import { subschemaPositions } from './walk.ts';
import type { Warnings } from './warnings.ts';

/**
 * Converts a boolean schema into an equivalent object schema.
 */
export const booleanSchemaToObject = (element: BooleanElement): ObjectElement =>
  toValue(element) ? new ObjectElement({}) : new ObjectElement({ not: {} });

/**
 * Appends schemas to `allOf`, creating it when missing.
 */
export const appendAllOf = (schema: ObjectElement, ...items: Element[]): void => {
  const allOf = schema.get('allOf');
  if (isArrayElement(allOf)) {
    items.forEach((item) => allOf.push(item));
  } else {
    schema.set('allOf', new ArrayElement(items));
  }
};

const convertBooleanSubschemas = (schema: ObjectElement): void => {
  subschemaPositions(schema)
    .filter((position) => position.keyword !== 'additionalProperties')
    .forEach((position) => {
      if (isBooleanElement(position.element)) {
        position.replace(booleanSchemaToObject(position.element));
      }
    });
};

const convertExamples = (schema: ObjectElement, warnings: Warnings): void => {
  const examples = schema.get('examples');
  if (examples === undefined) return;
  schema.remove('examples');

  if (!isArrayElement(examples) || examples.length === 0) return;

  schema.set('example', cloneDeep(examples.get(0)));
  if (examples.length > 1) {
    warnings.add(
      examples,
      'examples-truncated',
      `"examples" has ${examples.length} entries; only the first was kept as "example"`,
    );
  }
};

const setNullOnly = (schema: ObjectElement): void => {
  schema.set('type', 'string');
  schema.set('nullable', true);
  schema.set('enum', new ArrayElement([new NullElement()]));
};

const convertConst = (schema: ObjectElement): boolean => {
  if (!schema.hasKey('const')) return false;
  const value = schema.get('const');
  schema.remove('const');

  if (isNullElement(value)) return true;

  const constEnum = new ArrayElement([cloneDeep(value)]);
  if (schema.hasKey('enum')) {
    appendAllOf(schema, new ObjectElement({ enum: constEnum }));
  } else {
    schema.set('enum', constEnum);
  }
  return false;
};

const splitTypes = (schema: ObjectElement, types: string[], nullable: boolean): void => {
  const moved = new Set<string>();
  const branches = types.map((type) => {
    const branch = new ObjectElement({ type });
    (TYPE_SPECIFIC_KEYWORDS[type] ?? []).forEach((keyword) => {
      if (!schema.hasKey(keyword)) return;
      branch.set(keyword, cloneDeep(schema.get(keyword)));
      moved.add(keyword);
    });
    if (nullable) branch.set('nullable', true);
    return branch;
  });

  moved.forEach((keyword) => schema.remove(keyword));
  schema.remove('type');

  if (schema.hasKey('anyOf')) {
    appendAllOf(schema, new ObjectElement({ anyOf: new ArrayElement(branches) }));
  } else {
    schema.set('anyOf', new ArrayElement(branches));
  }
};

const convertType = (schema: ObjectElement, nullOnlyFromConst: boolean): void => {
  const type = schema.get('type');
  let nullOnly = nullOnlyFromConst;

  if (isStringElement(type) && toValue(type) === 'null') {
    nullOnly = true;
  } else if (isArrayElement(type)) {
    const listed = [...new Set(type.toValue() as string[])];
    const others = listed.filter((t) => t !== 'null');
    const hasNull = listed.includes('null');

    if (others.length === 0) {
      nullOnly = true;
    } else if (others.length === 1) {
      schema.set('type', others[0]);
      if (hasNull) schema.set('nullable', true);
    } else {
      splitTypes(schema, others, hasNull);
    }
  }

  if (nullOnly) setNullOnly(schema);
};

const removeUnreachableNullFromEnum = (schema: ObjectElement): void => {
  const enumElement = schema.get('enum');
  if (!isArrayElement(enumElement) || !isStringElement(schema.get('type'))) return;
  if (toValue(schema.get('nullable')) === true) return;
  if (!enumElement.content.some(isNullElement)) return;

  const kept = enumElement.content.filter((item) => !isNullElement(item));
  if (kept.length === 0) {
    schema.remove('enum');
    schema.set('not', new ObjectElement({}));
  } else {
    schema.set('enum', new ArrayElement(kept));
  }
};

const convertExclusiveBound = (
  schema: ObjectElement,
  exclusiveKeyword: 'exclusiveMinimum' | 'exclusiveMaximum',
  inclusiveKeyword: 'minimum' | 'maximum',
): void => {
  const exclusive = schema.get(exclusiveKeyword);
  if (!isNumberElement(exclusive)) return;

  const exclusiveValue = toValue(exclusive) as number;
  const inclusive = schema.get(inclusiveKeyword);
  const isInclusiveStricter =
    isNumberElement(inclusive) &&
    (inclusiveKeyword === 'minimum'
      ? (toValue(inclusive) as number) > exclusiveValue
      : (toValue(inclusive) as number) < exclusiveValue);

  if (isInclusiveStricter) {
    schema.remove(exclusiveKeyword);
  } else {
    schema.set(inclusiveKeyword, exclusiveValue);
    schema.set(exclusiveKeyword, true);
  }
};

const removeEmptyRequired = (schema: ObjectElement): void => {
  const required = schema.get('required');
  if (isArrayElement(required) && required.length === 0) schema.remove('required');
};

const dropKeywords = (schema: ObjectElement, warnings: Warnings): void => {
  [...DROPPED_KEYWORDS, ...IDENTIFIER_KEYWORDS].forEach((keyword) => {
    if (!schema.hasKey(keyword)) return;
    warnings.add(
      schema.get(keyword),
      'dropped-keyword',
      `"${keyword}" is not supported in OpenAPI 3.0 and was removed`,
    );
    schema.remove(keyword);
  });
};

/**
 * Applies the value rules to one schema, in place. Subschemas are handled separately.
 */
const applyValueRules = (schema: ObjectElement, warnings: Warnings): void => {
  convertBooleanSubschemas(schema);
  convertExamples(schema, warnings);
  const nullOnlyFromConst = convertConst(schema);
  convertType(schema, nullOnlyFromConst);
  removeUnreachableNullFromEnum(schema);
  convertExclusiveBound(schema, 'exclusiveMinimum', 'minimum');
  convertExclusiveBound(schema, 'exclusiveMaximum', 'maximum');
  removeEmptyRequired(schema);
  dropKeywords(schema, warnings);
};

export default applyValueRules;
