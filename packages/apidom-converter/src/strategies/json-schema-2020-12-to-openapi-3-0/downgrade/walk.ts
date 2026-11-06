import {
  Element,
  ObjectElement,
  isArrayElement,
  isBooleanElement,
  isObjectElement,
  toValue,
} from '@swagger-api/apidom-core';

import { SCHEMA_ARRAY_KEYWORDS, SCHEMA_KEYWORDS, SCHEMA_MAP_KEYWORDS } from './keywords.ts';

/**
 * A subschema position inside a schema: where it is, what is there, and how to replace it.
 */
export interface SubschemaPosition {
  readonly keyword: string;
  readonly path: readonly string[];
  readonly element: Element;
  readonly replace: (element: Element) => void;
}

/**
 * A schema is an object or a boolean (JSON Schema Draft 6 and later).
 */
export const isSchemaLike = (element: unknown): element is Element =>
  isObjectElement(element) || isBooleanElement(element);

/**
 * Lists the direct subschema positions of a schema. Data positions (`example`, `default`,
 * `enum`, `const`, `examples`, extensions, …) are never returned.
 */
export const subschemaPositions = (schema: ObjectElement): SubschemaPosition[] => {
  const positions: SubschemaPosition[] = [];

  SCHEMA_KEYWORDS.forEach((keyword) => {
    const value = schema.get(keyword);
    if (!isSchemaLike(value)) return;
    positions.push({
      keyword,
      path: [keyword],
      element: value,
      replace: (element) => schema.set(keyword, element),
    });
  });

  SCHEMA_ARRAY_KEYWORDS.forEach((keyword) => {
    const value = schema.get(keyword);
    if (!isArrayElement(value)) return;
    value.content.forEach((item, index) => {
      if (!isSchemaLike(item)) return;
      positions.push({
        keyword,
        path: [keyword, String(index)],
        element: item,
        replace: (element) => {
          value.content[index] = element;
        },
      });
    });
  });

  SCHEMA_MAP_KEYWORDS.forEach((keyword) => {
    const value = schema.get(keyword);
    if (!isObjectElement(value)) return;
    value.forEach((item: Element, key: Element) => {
      if (!isSchemaLike(item)) return;
      const name = String(toValue(key));
      positions.push({
        keyword,
        path: [keyword, name],
        element: item,
        replace: (element) => value.set(name, element),
      });
    });
  });

  return positions;
};

/**
 * Visits a schema and all its subschemas, children before parents.
 * `path` is the list of JSON Pointer tokens from the starting schema.
 */
export const walkSchemas = (
  schema: Element,
  visit: (schema: Element, path: readonly string[]) => void,
  path: readonly string[] = [],
): void => {
  if (isObjectElement(schema)) {
    subschemaPositions(schema).forEach((position) =>
      walkSchemas(position.element, visit, [...path, ...position.path]),
    );
  }
  visit(schema, path);
};
