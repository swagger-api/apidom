import {
  ArrayElement,
  Element,
  isArrayElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';

import downgradeSchema from './index.ts';
import { baseURIAt, buildIdentifierIndex, fragmentTokens, toPointerFragment } from './refs.ts';
import type { Warnings } from './warnings.ts';

const TARGET_META = 'downgrade-ref-targets';

export const elementAt = (document: Element, tokens: readonly string[]): Element | undefined =>
  tokens.reduce<Element | undefined>((current, token) => {
    if (isObjectElement(current)) return current.get(token) as Element | undefined;
    if (isArrayElement(current)) return current.get(Number(token)) as Element | undefined;
    return undefined;
  }, document);

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

const forEachInternalRef = (
  document: Element,
  visit: (owner: Element, fragment: string) => void,
): void =>
  forEachElement(document, (element) => {
    if (!isObjectElement(element)) return;
    const ref = element.get('$ref');
    if (isStringElement(ref) && toValue(ref).startsWith('#')) visit(element, toValue(ref));
  });

const canonical = (fragment: string): string =>
  toPointerFragment(fragmentTokens(fragment.slice(1)));

const tagTarget = (target: Element, fragment: string): void => {
  const tags = target.meta.get(TARGET_META);
  const existing = isArrayElement(tags) ? (toValue(tags) as string[]) : [];
  target.setMetaProperty(TARGET_META, new ArrayElement([...existing, fragment]));
};

/**
 * Converts the schemas at the given JSON Pointers of a document, in place, and rewrites every
 * internal `$ref` of the document whose target moved: keywords moved into `x-conversion-*`,
 * subschemas relocated by the rules, and `$anchor`/`$id` targets. A target that ends up in
 * several places (rules may copy subschemas) is referenced at its first occurrence.
 */
const downgradeSchemasInDocument = (
  document: Element,
  documentURI: string,
  schemaPointers: ReadonlyArray<readonly string[]>,
  warnings: Warnings,
): void => {
  const index = buildIdentifierIndex(document, documentURI);

  const targets = new Map<string, readonly string[]>();
  forEachInternalRef(document, (_owner, fragment) =>
    targets.set(canonical(fragment), fragmentTokens(fragment.slice(1))),
  );
  index.forEach((tokens) => targets.set(toPointerFragment(tokens), tokens));
  const tagged: Element[] = [];
  targets.forEach((tokens, fragment) => {
    const target = elementAt(document, tokens);
    if (target === undefined) return;
    tagTarget(target, fragment);
    tagged.push(target);
  });

  schemaPointers.forEach((tokens) => {
    const schema = elementAt(document, tokens);
    if (schema === undefined) return;
    const downgraded = downgradeSchema(schema, warnings, {
      documentURI,
      baseURI: baseURIAt(document, documentURI, tokens),
      index,
    });
    replaceAt(document, tokens, downgraded);
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

  forEachInternalRef(document, (owner, fragment) => {
    const destination = moved.get(canonical(fragment));
    if (
      destination !== undefined &&
      destination !== canonical(fragment) &&
      isObjectElement(owner)
    ) {
      owner.set('$ref', destination);
    }
  });
};

export default downgradeSchemasInDocument;
