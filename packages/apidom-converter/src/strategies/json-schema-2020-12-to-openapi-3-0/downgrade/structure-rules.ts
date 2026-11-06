import {
  ArrayElement,
  Element,
  ObjectElement,
  cloneDeep,
  isArrayElement,
  isObjectElement,
  toValue,
} from '@swagger-api/apidom-core';

import { appendAllOf } from './value-rules.ts';
import type { Warnings } from './warnings.ts';

const stashKey = (keyword: string): string => `x-conversion-${keyword}`;

/**
 * Adds an applicator the rules introduce. When the schema already has that applicator, the new
 * one is wrapped in `allOf` so both keep applying.
 */
const addApplicator = (schema: ObjectElement, keyword: 'anyOf' | 'oneOf', items: Element[]) => {
  if (schema.hasKey(keyword)) {
    appendAllOf(schema, new ObjectElement({ [keyword]: new ArrayElement(items) }));
  } else {
    schema.set(keyword, new ArrayElement(items));
  }
};

/**
 * Matches every instance that is not an object containing `property`. `required` alone would not
 * do: it passes for non-objects, so its negation would reject them.
 */
const notRequired = (property: string) =>
  new ObjectElement({ not: new ObjectElement({ type: 'object', required: [property] }) });

const requiredProperties = (properties: string[]) => new ObjectElement({ required: properties });

const allOf = (...items: Element[]) => new ObjectElement({ allOf: new ArrayElement(items) });

const foldDependentRequired = (schema: ObjectElement, dependentRequired: ObjectElement) => {
  dependentRequired.forEach((value: Element, key: Element) => {
    if (!isArrayElement(value)) return;
    const property = String(toValue(key));
    const dependents = (toValue(value) as unknown[]).map(String);
    addApplicator(schema, 'anyOf', [
      notRequired(property),
      requiredProperties([property, ...dependents]),
    ]);
  });
};

const foldDependentSchemas = (schema: ObjectElement, dependentSchemas: ObjectElement) => {
  dependentSchemas.forEach((value: Element, key: Element) => {
    if (!isObjectElement(value)) return;
    const property = String(toValue(key));
    addApplicator(schema, 'anyOf', [
      notRequired(property),
      allOf(requiredProperties([property]), value),
    ]);
  });
};

const foldDependencies = (schema: ObjectElement) => {
  (['dependentRequired', 'dependentSchemas', 'dependencies'] as const).forEach((keyword) => {
    const value = schema.get(keyword);
    if (!isObjectElement(value)) return;
    schema.remove(keyword);
    foldDependentRequired(schema, value);
    foldDependentSchemas(schema, value);
  });
};

const foldConditional = (schema: ObjectElement, warnings: Warnings) => {
  const ifSchema = schema.get('if');
  const thenSchema = schema.get('then');
  const elseSchema = schema.get('else');

  if (ifSchema === undefined || (thenSchema === undefined && elseSchema === undefined)) {
    (['if', 'then', 'else'] as const).forEach((keyword) => {
      if (!schema.hasKey(keyword)) return;
      schema.set(stashKey(keyword), schema.get(keyword));
      schema.remove(keyword);
      warnings.add(
        schema.get(stashKey(keyword)),
        'moved-keyword',
        `"${keyword}" has no effect without its counterpart and was moved to "${stashKey(keyword)}"`,
      );
    });
    return;
  }

  schema.remove('if');
  schema.remove('then');
  schema.remove('else');
  const notIf = () => new ObjectElement({ not: cloneDeep(ifSchema) });

  if (thenSchema !== undefined && elseSchema !== undefined) {
    addApplicator(schema, 'oneOf', [
      allOf(cloneDeep(ifSchema), thenSchema),
      allOf(notIf(), elseSchema),
    ]);
  } else if (thenSchema !== undefined) {
    addApplicator(schema, 'anyOf', [notIf(), allOf(cloneDeep(ifSchema), thenSchema)]);
  } else {
    addApplicator(schema, 'anyOf', [cloneDeep(ifSchema), allOf(notIf(), elseSchema!)]);
  }
};

/**
 * Groups of keywords moved together into `x-conversion-*`: moving one without the others would
 * change what the remaining keyword means.
 */
const moveGroups = (schema: ObjectElement): string[][] => {
  const groups: string[][] = [];
  const has = (keyword: string) => schema.hasKey(keyword);

  if (has('prefixItems')) {
    groups.push(['prefixItems', ...(has('items') ? ['items'] : [])]);
  } else if (isArrayElement(schema.get('items'))) {
    groups.push(['items', ...(has('additionalItems') ? ['additionalItems'] : [])]);
  } else if (has('additionalItems')) {
    groups.push(['additionalItems']);
  }

  if (has('patternProperties')) {
    groups.push([
      'patternProperties',
      ...(has('additionalProperties') ? ['additionalProperties'] : []),
    ]);
  }

  [
    '$defs',
    'definitions',
    'propertyNames',
    'contains',
    'unevaluatedProperties',
    'unevaluatedItems',
    'contentSchema',
  ].forEach((keyword) => {
    if (has(keyword)) groups.push([keyword]);
  });

  return groups;
};

const moveKeywords = (schema: ObjectElement, warnings: Warnings) => {
  moveGroups(schema).forEach((group) => {
    group.forEach((keyword) => {
      schema.set(stashKey(keyword), schema.get(keyword));
      schema.remove(keyword);
    });
    const [keyword] = group;
    const moved = group.map((name) => `"${name}"`).join(' and ');
    warnings.add(
      schema.get(stashKey(keyword)),
      'moved-keyword',
      `${moved} ${group.length > 1 ? 'are' : 'is'} not supported in OpenAPI 3.0 and ${
        group.length > 1 ? 'were' : 'was'
      } moved to ${group.map((name) => `"${stashKey(name)}"`).join(' and ')}`,
    );
  });
};

/**
 * Applies the structural rules to one schema, in place: keywords without an OpenAPI 3.0 form
 * move to `x-conversion-*`, conditionals and dependencies fold into applicators.
 */
const applyStructureRules = (schema: ObjectElement, warnings: Warnings): void => {
  moveKeywords(schema, warnings);
  foldConditional(schema, warnings);
  foldDependencies(schema);
};

export default applyStructureRules;
