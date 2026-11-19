import {
  ArrayElement,
  Element,
  ObjectElement,
  isArrayElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import { compile, evaluate } from '@swagger-api/apidom-json-pointer/modern';

import downgradeSchema from './index.ts';
import needsDowngrade from './detect.ts';
import {
  baseURIAt,
  buildIdentifierIndex,
  forEachMappingRef,
  fragmentTokens,
  rewriteIdentifierRefs,
  toPointerFragment,
} from './refs.ts';
import { forEachSchema } from './walk.ts';
import type { Warnings } from './warnings.ts';

const TARGET_META = 'downgrade-ref-targets';

/**
 * Returns the element at the given JSON Pointer tokens, or `undefined` when there is none.
 */
export const elementAt = (document: Element, tokens: readonly string[]): Element | undefined => {
  try {
    return evaluate<Element>(document, compile([...tokens]));
  } catch {
    return undefined;
  }
};

export const replaceAt = (document: Element, tokens: readonly string[], element: Element): void => {
  if (tokens.length === 0) {
    document.content = element.content; // eslint-disable-line no-param-reassign
    return;
  }
  const parent = elementAt(document, tokens.slice(0, -1));
  const key = tokens[tokens.length - 1];
  if (isObjectElement(parent)) parent.set(key, element);
  if (isArrayElement(parent)) parent.content[Number(key)] = element;
};

export const forEachElement = (
  element: Element,
  visit: (element: Element, tokens: readonly string[]) => void,
  tokens: readonly string[] = [],
): void => {
  visit(element, tokens);
  if (isObjectElement(element)) {
    element.forEach((value: Element, key: Element) =>
      forEachElement(value, visit, [...tokens, String(toValue(key))]),
    );
  } else if (isArrayElement(element)) {
    (element.content as Element[]).forEach((item, index) =>
      forEachElement(item, visit, [...tokens, String(index)]),
    );
  }
};

/**
 * Visits every internal reference (`$ref` and `discriminator.mapping` values) of the schemas at
 * the given pointers, subschemas and the converter's stashes included, with its JSON Pointer
 * tokens. Data and extensions that look like references, and fragments that are not JSON
 * Pointers, are not visited.
 */
const forEachInternalRef = (
  document: Element,
  schemaPointers: ReadonlyArray<readonly string[]>,
  visit: (tokens: string[], replace: (ref: string) => void) => void,
): void => {
  const visitRef = (ref: string, replace: (value: string) => void) => {
    if (!ref.startsWith('#')) return;
    const tokens = fragmentTokens(ref.slice(1));
    if (tokens !== undefined) visit(tokens, replace);
  };

  schemaPointers.forEach((pointer) => {
    const root = elementAt(document, pointer);
    if (root === undefined) return;
    forEachSchema(root, (schema) => {
      if (!isObjectElement(schema)) return;
      const ref = schema.get('$ref');
      if (isStringElement(ref)) visitRef(toValue(ref), (value) => schema.set('$ref', value));
      forEachMappingRef(schema as ObjectElement, visitRef);
    });
  });
};

const tagTarget = (target: Element, fragment: string): void => {
  const tags = target.meta.get(TARGET_META);
  const existing = isArrayElement(tags) ? (toValue(tags) as string[]) : [];
  target.setMetaProperty(TARGET_META, new ArrayElement([...existing, fragment]));
};

/**
 * Takes the JSON Pointers of the outermost schemas of a document and, in place:
 * rewrites `$ref`s to `$anchor`s and `$id`s of the document into JSON Pointers (in every schema,
 * so that a bare `$ref` to an `$id` is never left for the dereference to fetch), converts the
 * schemas that need it, and rewrites every internal `$ref` whose target moved: keywords moved
 * into `x-conversion-*`, subschemas relocated by the rules, and `$anchor`/`$id` targets. A target
 * that ends up in several places (rules may copy subschemas) is referenced at its first occurrence.
 */
const downgradeSchemasInDocument = (
  document: Element,
  documentURI: string,
  schemaPointers: ReadonlyArray<readonly string[]>,
  warnings: Warnings,
): void => {
  const index = buildIdentifierIndex(document, documentURI);

  const toConvert = schemaPointers.filter((tokens) => {
    const schema = elementAt(document, tokens);
    return schema !== undefined && needsDowngrade(schema);
  });

  schemaPointers.forEach((tokens) => {
    const schema = elementAt(document, tokens);
    if (schema === undefined) return;
    rewriteIdentifierRefs(
      schema,
      baseURIAt(document, documentURI, tokens),
      documentURI,
      index,
      warnings,
    );
  });

  const targets = new Map<string, readonly string[]>();
  forEachInternalRef(document, schemaPointers, (tokens) =>
    targets.set(toPointerFragment(tokens), tokens),
  );
  index.forEach((tokens) => targets.set(toPointerFragment(tokens), tokens));
  const tagged: Element[] = [];
  targets.forEach((tokens, fragment) => {
    const target = elementAt(document, tokens);
    if (target === undefined) return;
    tagTarget(target, fragment);
    tagged.push(target);
  });

  toConvert.forEach((tokens) => {
    replaceAt(document, tokens, downgradeSchema(elementAt(document, tokens)!, warnings));
  });

  const moved = new Map<string, string>();
  forEachElement(document, (element, tokens) => {
    const tags = element.meta.get(TARGET_META);
    if (!isArrayElement(tags)) return;
    (toValue(tags) as string[]).forEach((fragment) => {
      if (!moved.has(fragment)) moved.set(fragment, toPointerFragment(tokens));
    });
    element.meta.remove(TARGET_META);
  });
  tagged.forEach((element) => element.meta.remove(TARGET_META));

  forEachInternalRef(document, schemaPointers, (tokens, replace) => {
    const fragment = toPointerFragment(tokens);
    const destination = moved.get(fragment);
    if (destination !== undefined && destination !== fragment) replace(destination);
  });
};

export default downgradeSchemasInDocument;
