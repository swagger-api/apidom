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
const appendAllOf = (schema: ObjectElement, ...items: Element[]): void => {
  const allOf = schema.get('allOf');
  if (isArrayElement(allOf)) {
    items.forEach((item) => allOf.push(item));
  } else {
    schema.set('allOf', new ArrayElement(items));
  }
};

/**
 * Adds a keyword the rules introduce. When the schema already has that keyword, the new one is
 * wrapped in `allOf` so both keep applying.
 */
export const addKeyword = (schema: ObjectElement, keyword: string, value: Element): void => {
  if (schema.hasKey(keyword)) {
    appendAllOf(schema, new ObjectElement({ [keyword]: value }));
  } else {
    schema.set(keyword, value);
  }
};

export const convertBooleanSubschemas = (schema: ObjectElement): void => {
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

/**
 * Makes a schema accept nothing, keeping an existing `not`.
 */
const rejectAll = (schema: ObjectElement): void => addKeyword(schema, 'not', new ObjectElement({}));

/**
 * Whether the schema's own `type`, `nullable` and `enum` accept `null`.
 */
const allowsNull = (schema: ObjectElement): boolean => {
  const type = schema.get('type');
  const typeAllowsNull =
    type === undefined ||
    toValue(schema.get('nullable')) === true ||
    (isStringElement(type) && toValue(type) === 'null') ||
    (isArrayElement(type) && type.content.some((item) => toValue(item) === 'null'));
  const enumElement = schema.get('enum');

  return (
    typeAllowsNull && (!isArrayElement(enumElement) || enumElement.content.some(isNullElement))
  );
};

/**
 * Converts `const`. Returns whether the schema must take the null-only form (`const: null` that
 * the schema's `type` and `enum` allow); a `const: null` they don't allow makes it accept nothing.
 */
const convertConst = (schema: ObjectElement): boolean => {
  if (!schema.hasKey('const')) return false;
  const value = schema.get('const');
  schema.remove('const');

  if (isNullElement(value)) {
    if (allowsNull(schema)) {
      schema.remove('type');
      return true;
    }
    rejectAll(schema);
    return false;
  }

  addKeyword(schema, 'enum', new ArrayElement([cloneDeep(value)]));
  return false;
};

const splitTypes = (schema: ObjectElement, types: string[], nullable: boolean): ObjectElement[] => {
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

  addKeyword(schema, 'anyOf', new ArrayElement(branches));

  return branches;
};

/**
 * Converts `type`. Returns the branches created when several types are split into `anyOf`; the
 * type-specific keywords moved into them still need the remaining value rules.
 */
const convertType = (schema: ObjectElement, nullOnlyFromConst: boolean): ObjectElement[] => {
  const type = schema.get('type');
  let nullOnly = nullOnlyFromConst;
  let branches: ObjectElement[] = [];

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
      branches = splitTypes(schema, others, hasNull);
    }
  }

  if (nullOnly) setNullOnly(schema);
  return branches;
};

const removeUnreachableNullFromEnum = (schema: ObjectElement): void => {
  const enumElement = schema.get('enum');
  if (!isArrayElement(enumElement) || !isStringElement(schema.get('type'))) return;
  if (toValue(schema.get('nullable')) === true) return;
  if (!enumElement.content.some(isNullElement)) return;

  const kept = enumElement.content.filter((item) => !isNullElement(item));
  if (kept.length === 0) {
    schema.remove('enum');
    rejectAll(schema);
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

/**
 * An empty `enum` accepts no value, but OpenAPI 3.0 requires at least one item.
 */
const convertEmptyEnum = (schema: ObjectElement): void => {
  const enumElement = schema.get('enum');
  if (!isArrayElement(enumElement) || enumElement.length > 0) return;
  schema.remove('enum');
  rejectAll(schema);
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
 * Applies the value rules to one schema, in place. Boolean subschemas must already be converted
 * (see `convertBooleanSubschemas`); subschemas themselves are handled separately.
 */
const applyValueRules = (schema: ObjectElement, warnings: Warnings): void => {
  convertExamples(schema, warnings);
  convertEmptyEnum(schema);
  const nullOnlyFromConst = convertConst(schema);
  const branches = convertType(schema, nullOnlyFromConst);
  removeUnreachableNullFromEnum(schema);
  convertExclusiveBound(schema, 'exclusiveMinimum', 'minimum');
  convertExclusiveBound(schema, 'exclusiveMaximum', 'maximum');
  removeEmptyRequired(schema);
  dropKeywords(schema, warnings);
  branches.forEach((branch) => applyValueRules(branch, warnings));
};

export default applyValueRules;
