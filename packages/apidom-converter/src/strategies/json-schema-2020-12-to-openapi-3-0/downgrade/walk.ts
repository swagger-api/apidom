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

const STASH_META = 'conversion-stash';

/**
 * The extension a keyword without an OpenAPI 3.0 form is moved to.
 */
export const stashKey = (keyword: string): string => `x-conversion-${keyword}`;

/**
 * Moves the value of `keyword` to `x-conversion-<keyword>` and marks it as created by the
 * converter, so that it is walked as the keyword it came from (see `subschemaPositions`), unlike
 * a user's own `x-conversion-*` extension. Fails when the schema already has that extension.
 */
export const stashKeyword = (schema: ObjectElement, keyword: string): void => {
  if (schema.hasKey(stashKey(keyword))) {
    throw new Error(
      `Cannot move "${keyword}" to "${stashKey(keyword)}": the schema already has "${stashKey(keyword)}"`,
    );
  }
  const value = schema.get(keyword);
  value.setMetaProperty(STASH_META, true);
  schema.set(stashKey(keyword), value);
  schema.remove(keyword);
};

const isStash = (element: Element | undefined): boolean =>
  element !== undefined && element.meta.hasKey(STASH_META);

/**
 * Removes the stash marks the converter left in an element tree.
 */
export const unmarkStash = (element: Element): void => {
  element.meta.remove(STASH_META);
};

export interface SubschemaOptions {
  /** Also return subschemas inside the converter's `x-conversion-*` stashes. */
  readonly stashes?: boolean;
}

/**
 * Lists the direct subschema positions of a schema. Data positions (`example`, `default`,
 * `enum`, `const`, `examples`, extensions, …) are never returned. With `stashes`, the
 * converter's `x-conversion-<keyword>` stashes are read as `<keyword>`.
 */
export const subschemaPositions = (
  schema: ObjectElement,
  { stashes = false }: SubschemaOptions = {},
): SubschemaPosition[] => {
  const positions: SubschemaPosition[] = [];
  const fields = (keyword: string): string[] => {
    const stash = stashKey(keyword);
    return stashes && isStash(schema.get(stash)) ? [keyword, stash] : [keyword];
  };

  SCHEMA_KEYWORDS.forEach((keyword) =>
    fields(keyword).forEach((field) => {
      const value = schema.get(field);
      if (!isSchemaLike(value)) return;
      positions.push({
        keyword,
        path: [field],
        element: value,
        replace: (element) => schema.set(field, element),
      });
    }),
  );

  SCHEMA_ARRAY_KEYWORDS.forEach((keyword) =>
    fields(keyword).forEach((field) => {
      const value = schema.get(field);
      if (!isArrayElement(value)) return;
      value.content.forEach((item, index) => {
        if (!isSchemaLike(item)) return;
        positions.push({
          keyword,
          path: [field, String(index)],
          element: item,
          replace: (element) => {
            value.content[index] = element;
          },
        });
      });
    }),
  );

  SCHEMA_MAP_KEYWORDS.forEach((keyword) =>
    fields(keyword).forEach((field) => {
      const value = schema.get(field);
      if (!isObjectElement(value)) return;
      value.forEach((item: Element, key: Element) => {
        if (!isSchemaLike(item)) return;
        const name = String(toValue(key));
        positions.push({
          keyword,
          path: [field, name],
          element: item,
          replace: (element) => value.set(name, element),
        });
      });
    }),
  );

  return positions;
};

/**
 * Visits a schema and every subschema below it, including those inside the converter's
 * `x-conversion-*` stashes, parents before children. `inStash` tells whether a schema is
 * inside a stash. Data and extensions are never visited.
 */
export const forEachSchema = (
  schema: Element,
  visit: (schema: Element, inStash: boolean) => void,
  inStash = false,
): void => {
  visit(schema, inStash);
  if (!isObjectElement(schema)) return;
  subschemaPositions(schema, { stashes: true }).forEach((position) =>
    forEachSchema(position.element, visit, inStash || position.path[0] !== position.keyword),
  );
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
