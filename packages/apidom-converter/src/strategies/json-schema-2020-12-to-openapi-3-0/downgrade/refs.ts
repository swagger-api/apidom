import {
  ArrayElement,
  Element,
  ObjectElement,
  isArrayElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import { url } from '@swagger-api/apidom-reference';

import { ANNOTATION_KEYWORDS, SCHEMA_MAP_KEYWORDS, isExtensionKeyword } from './keywords.ts';
import { subschemaPositions } from './walk.ts';
import type { Warnings } from './warnings.ts';

/**
 * Maps `$id` URIs and `$anchor`/`$dynamicAnchor` names (as `<base URI>#<anchor>`) to the JSON
 * Pointer tokens of the schema that declares them, within one document.
 */
export type IdentifierIndex = Map<string, readonly string[]>;

const DATA_KEYWORDS = new Set(['example', 'examples', 'default', 'enum', 'const', 'value']);

/**
 * Object fields whose keys are names, not keywords (JSON Schema maps and OpenAPI maps).
 */
const MAP_FIELDS = new Set<string>([
  ...SCHEMA_MAP_KEYWORDS,
  'schemas',
  'responses',
  'parameters',
  'examples',
  'requestBodies',
  'headers',
  'securitySchemes',
  'links',
  'callbacks',
  'paths',
  'content',
  'encoding',
  'mapping',
  'variables',
  'scopes',
]);

const escapeToken = (token: string): string =>
  encodeURIComponent(token.replace(/~/g, '~0').replace(/\//g, '~1')).replace(
    /%(24|26|2B|2C|3A|3B|3D|40)/g,
    (encoded) => decodeURIComponent(encoded),
  );

const unescapeToken = (token: string): string =>
  decodeURIComponent(token).replace(/~1/g, '/').replace(/~0/g, '~');

/**
 * Builds a URI fragment JSON Pointer (`#/a/b`) from pointer tokens.
 */
export const toPointerFragment = (tokens: readonly string[]): string =>
  `#${tokens.map((token) => `/${escapeToken(token)}`).join('')}`;

/**
 * Splits a JSON Pointer (`/a/b`, without the leading `#`) into unescaped tokens.
 */
export const fragmentTokens = (fragment: string): string[] =>
  fragment === '' ? [] : fragment.slice(1).split('/').map(unescapeToken);

const normalizeId = (uri: string): string => url.stripHash(uri);

/**
 * Indexes every `$id`, `$anchor` and `$dynamicAnchor` of a document, following the `$id`
 * base-URI chain. Data positions and extensions are skipped.
 */
export const buildIdentifierIndex = (document: Element, documentURI: string): IdentifierIndex => {
  const index: IdentifierIndex = new Map();

  const visit = (element: Element, tokens: string[], base: string, isMap: boolean) => {
    if (isArrayElement(element)) {
      (element.content as Element[]).forEach((item, position) =>
        visit(item, [...tokens, String(position)], base, false),
      );
      return;
    }
    if (!isObjectElement(element)) return;

    let currentBase = base;
    if (!isMap) {
      const id = element.get('$id');
      if (isStringElement(id)) {
        currentBase = normalizeId(url.resolve(base, toValue(id)));
        index.set(currentBase, tokens);
      }
      ['$anchor', '$dynamicAnchor'].forEach((keyword) => {
        const anchor = element.get(keyword);
        if (isStringElement(anchor)) index.set(`${currentBase}#${toValue(anchor)}`, tokens);
      });
    }

    element.forEach((value: Element, keyElement: Element) => {
      const key = String(toValue(keyElement));
      if (!isMap && (DATA_KEYWORDS.has(key) || isExtensionKeyword(key))) return;
      visit(value, [...tokens, key], currentBase, !isMap && MAP_FIELDS.has(key));
    });
  };

  visit(document, [], normalizeId(documentURI), false);

  return index;
};

/**
 * Returns the base URI in effect at a JSON Pointer of a document (the `$id` chain above it).
 */
export const baseURIAt = (
  document: Element,
  documentURI: string,
  tokens: readonly string[],
): string => {
  let base = normalizeId(documentURI);
  let current: Element | undefined = document;

  tokens.forEach((token) => {
    if (isObjectElement(current)) {
      const id = current.get('$id');
      if (isStringElement(id)) base = normalizeId(url.resolve(base, toValue(id)));
      current = current.get(token);
    } else if (isArrayElement(current)) {
      current = current.get(Number(token));
    } else {
      current = undefined;
    }
  });

  return base;
};

const rewriteRef = (
  ref: string,
  base: string,
  documentURI: string,
  index: IdentifierIndex,
): string | undefined => {
  const absolute = url.resolve(base, ref);
  const target = normalizeId(absolute);
  const hashIndex = absolute.indexOf('#');
  const fragment = hashIndex === -1 ? '' : absolute.slice(hashIndex + 1);

  if (fragment === '' || fragment.startsWith('/')) {
    if (target === normalizeId(documentURI)) return undefined;
    const idTokens = index.get(target);
    if (idTokens === undefined) return undefined;
    return toPointerFragment([...idTokens, ...fragmentTokens(fragment)]);
  }

  const anchorTokens = index.get(`${target}#${decodeURIComponent(fragment)}`);
  return anchorTokens === undefined ? undefined : toPointerFragment(anchorTokens);
};

const isRelativeDocumentRef = (ref: string): boolean =>
  !ref.startsWith('#') && url.getProtocol(ref) === undefined;

/**
 * Rewrites `$ref`s that point at an `$anchor` or `$id` of the document into JSON Pointer refs.
 * `base` is the base URI in effect at `schema`. References to other documents are left as is;
 * when the `$id` base would resolve such a relative reference to another document than the one it
 * is read from, a warning is reported.
 */
export const rewriteIdentifierRefs = (
  schema: Element,
  base: string,
  documentURI: string,
  index: IdentifierIndex,
  warnings?: Warnings,
): void => {
  if (!isObjectElement(schema)) return;

  let currentBase = base;
  const id = schema.get('$id');
  if (isStringElement(id)) currentBase = normalizeId(url.resolve(base, toValue(id)));

  const ref = schema.get('$ref');
  if (isStringElement(ref)) {
    const value = toValue(ref);
    const rewritten = rewriteRef(value, currentBase, documentURI, index);
    if (rewritten !== undefined) {
      schema.set('$ref', rewritten);
    } else if (warnings !== undefined && isRelativeDocumentRef(value)) {
      const byId = normalizeId(url.resolve(currentBase, value));
      const byLocation = normalizeId(url.resolve(documentURI, value));
      if (byId !== byLocation) {
        warnings.add(
          ref,
          'id-base-mismatch',
          `"$ref" "${value}" is read from "${byLocation}"; its "$id" base would resolve it to "${byId}"`,
        );
      }
    }
  }

  subschemaPositions(schema).forEach((position) =>
    rewriteIdentifierRefs(position.element, currentBase, documentURI, index, warnings),
  );
};

/**
 * Moves the validation keywords next to a `$ref` into `allOf`, so they keep applying in OpenAPI
 * 3.0 (where siblings of `$ref` are ignored). Annotations and extensions stay on the schema.
 */
export const splitRefSiblings = (schema: ObjectElement): void => {
  const ref = schema.get('$ref');
  if (!isStringElement(ref)) return;

  const annotations = new Set<string>(ANNOTATION_KEYWORDS);
  const validationKeys = schema
    .keys()
    .map(String)
    .filter((key) => key !== '$ref' && !annotations.has(key) && !isExtensionKeyword(key));
  if (validationKeys.length === 0) return;

  const siblings = new ObjectElement();
  let existingAllOf: Element[] = [];
  validationKeys.forEach((key) => {
    const value = schema.get(key);
    if (key === 'allOf' && isArrayElement(value)) {
      existingAllOf = [...(value.content as Element[])];
    } else {
      siblings.set(key, value);
    }
    schema.remove(key);
  });
  schema.remove('$ref');

  const refSchema = new ObjectElement();
  refSchema.set('$ref', ref);
  const items = [...(siblings.length > 0 ? [siblings] : []), ...existingAllOf, refSchema];
  schema.set('allOf', new ArrayElement(items));
};
