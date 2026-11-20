import {
  ArrayElement,
  Element,
  ObjectElement,
  StringElement,
  isArrayElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import {
  URIFragmentIdentifier,
  compile,
  evaluate,
  parse,
} from '@swagger-api/apidom-json-pointer/modern';
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

/**
 * Builds a URI fragment JSON Pointer (`#/a/b`) from pointer tokens.
 */
export const toPointerFragment = (tokens: readonly string[]): string =>
  URIFragmentIdentifier.to(compile([...tokens]));

/**
 * Splits the URI fragment of a JSON Pointer (`/a/b`, without the leading `#`) into unescaped
 * tokens, or returns `undefined` when it is not a valid JSON Pointer.
 */
export const fragmentTokens = (fragment: string): string[] | undefined => {
  const { result, tree } = parse(URIFragmentIdentifier.from(`#${fragment}`));
  return result.success ? tree : undefined;
};

/**
 * Changes a string in place, so that it keeps its source map and metadata.
 */
export const setStringValue = (element: StringElement, value: string): void => {
  (element.content as unknown as string) = value; // eslint-disable-line no-param-reassign
};

const evaluateTokens = (document: Element, tokens: readonly string[]): Element | undefined => {
  try {
    return evaluate<Element>(document, compile([...tokens]));
  } catch {
    return undefined;
  }
};

const normalizeId = (uri: string): string => url.stripHash(uri);

/**
 * Resolves a URI reference against a base, or returns `undefined` when the base cannot resolve
 * it (a relative reference against a URN, for example).
 */
const resolveURI = (base: string, ref: string): string | undefined => {
  try {
    return url.resolve(base, ref);
  } catch {
    return undefined;
  }
};

const decodeFragment = (fragment: string): string => {
  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
};

interface SchemaId {
  /** The base URI in effect inside the schema. */
  readonly base: string;
  /** Whether the `$id` sets a new base URI (a fragment-only `$id` does not). */
  readonly setsBase: boolean;
  /** A plain-name fragment of the `$id`, which Draft 6/7 use as an anchor (`"$id": "#foo"`). */
  readonly anchor?: string;
}

/**
 * Reads the `$id` (Draft 4: `id`) of a schema, given the base URI in effect around it.
 */
const readId = (schema: ObjectElement, base: string): SchemaId => {
  const id = schema.hasKey('$id') ? schema.get('$id') : schema.get('id');
  if (!isStringElement(id)) return { base, setsBase: false };

  const value = toValue(id) as string;
  const hashIndex = value.indexOf('#');
  const fragment = hashIndex === -1 ? '' : value.slice(hashIndex + 1);
  const anchor =
    fragment !== '' && !fragment.startsWith('/') ? decodeFragment(fragment) : undefined;

  if (hashIndex === 0) return { base, setsBase: false, anchor };
  // an `$id` the base cannot resolve leaves the base unchanged
  const resolved = resolveURI(base, value);
  if (resolved === undefined) return { base, setsBase: false };
  return { base: normalizeId(resolved), setsBase: true, anchor };
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
      base = readId(current, base).base;
      current = current.get(token);
    } else if (isArrayElement(current)) {
      current = current.get(Number(token));
    } else {
      current = undefined;
    }
  });

  return base;
};

/**
 * Indexes every `$id`, `$anchor` and `$dynamicAnchor` of a document, following the `$id`
 * base-URI chain. Data positions and extensions are skipped. Given the pointers of the outermost
 * schemas of an OpenAPI document, only those schemas are indexed, so that data such as a Link's
 * `requestBody` is never taken for a schema.
 */
export const buildIdentifierIndex = (
  document: Element,
  documentURI: string,
  schemaPointers?: ReadonlyArray<readonly string[]>,
): IdentifierIndex => {
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
      const id = readId(element, base);
      currentBase = id.base;
      if (id.setsBase) index.set(currentBase, tokens);
      if (id.anchor !== undefined) index.set(`${currentBase}#${id.anchor}`, tokens);
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

  if (schemaPointers === undefined) {
    visit(document, [], normalizeId(documentURI), false);
    return index;
  }

  schemaPointers.forEach((tokens) => {
    const schema = evaluateTokens(document, tokens);
    if (schema !== undefined) {
      visit(schema, [...tokens], baseURIAt(document, documentURI, tokens), false);
    }
  });

  return index;
};

const rewriteRef = (
  ref: string,
  base: string,
  documentURI: string,
  index: IdentifierIndex,
): string | undefined => {
  const absolute = resolveURI(base, ref);
  if (absolute === undefined) return undefined;
  const target = normalizeId(absolute);
  const hashIndex = absolute.indexOf('#');
  const fragment = hashIndex === -1 ? '' : absolute.slice(hashIndex + 1);

  if (fragment === '' || fragment.startsWith('/')) {
    // a reference into the document itself, spelled with its URI, becomes a fragment, so that it
    // follows its target when the target moves
    if (target === normalizeId(documentURI)) return fragment === '' ? undefined : `#${fragment}`;
    const idTokens = index.get(target);
    const tokens = fragmentTokens(fragment);
    if (idTokens === undefined || tokens === undefined) return undefined;
    return toPointerFragment([...idTokens, ...tokens]);
  }

  const anchorTokens = index.get(`${target}#${decodeFragment(fragment)}`);
  return anchorTokens === undefined ? undefined : toPointerFragment(anchorTokens);
};

/**
 * Whether a `discriminator.mapping` value is a schema name rather than a reference.
 */
export const isSchemaName = (value: string): boolean => /^[a-zA-Z0-9.\-_]+$/.test(value);

/**
 * Visits the `discriminator.mapping` values of a schema that are references (not schema names).
 */
export const forEachMappingRef = (
  schema: ObjectElement,
  visit: (value: string, replace: (ref: string) => Element, element: Element) => void,
): void => {
  const discriminator = schema.get('discriminator');
  const mapping = isObjectElement(discriminator) ? discriminator.get('mapping') : undefined;
  if (!isObjectElement(mapping)) return;
  mapping.forEach((value: Element) => {
    if (!isStringElement(value) || isSchemaName(toValue(value))) return;
    const replace = (ref: string): Element => {
      setStringValue(value, ref);
      return value;
    };
    visit(toValue(value), replace, value);
  });
};

const isRelativeDocumentRef = (ref: string): boolean =>
  !ref.startsWith('#') && url.getProtocol(ref) === undefined;

/**
 * Marks a schema whose `$ref` was moved into `allOf` together with its siblings.
 */
export const REF_SPLIT_META = 'conversion-ref-split';

const refSiblingValidationKeys = (schema: ObjectElement): string[] => {
  const annotations = new Set<string>(ANNOTATION_KEYWORDS);
  return schema
    .keys()
    .map(String)
    .filter((key) => key !== '$ref' && !annotations.has(key) && !isExtensionKeyword(key));
};

/**
 * Rewrites `$ref`s and `discriminator.mapping` values that point at an `$anchor` or `$id` of the
 * document into JSON Pointer refs. `base` is the base URI in effect at `schema`. References to other documents are left as is;
 * when the `$id` base would resolve such a relative reference to another document than the one it
 * is read from, a warning is reported. Returns whether any `$ref` was changed.
 */
export const rewriteIdentifierRefs = (
  schema: Element,
  base: string,
  documentURI: string,
  index: IdentifierIndex,
  warnings?: Warnings,
): boolean => {
  if (!isObjectElement(schema)) return false;

  const currentBase = readId(schema, base).base;
  let changed = false;

  const ref = schema.get('$ref');
  if (isStringElement(ref)) {
    const value = toValue(ref);
    const rewritten = rewriteRef(value, currentBase, documentURI, index);
    if (rewritten !== undefined) {
      if (rewritten !== value) {
        setStringValue(ref, rewritten);
        changed = true;
      }
    } else if (warnings !== undefined && isRelativeDocumentRef(value)) {
      const byId = resolveURI(currentBase, value);
      const byLocation = normalizeId(url.resolve(documentURI, value));
      if (byId === undefined) {
        warnings.add(
          ref,
          'id-base-mismatch',
          `"$ref" "${value}" is read from "${byLocation}"; its "$id" base "${currentBase}" cannot resolve a relative reference`,
        );
      } else if (normalizeId(byId) !== byLocation) {
        warnings.add(
          ref,
          'id-base-mismatch',
          `"$ref" "${value}" is read from "${byLocation}"; its "$id" base would resolve it to "${normalizeId(byId)}"`,
        );
      }
    }
  }

  forEachMappingRef(schema, (value, replace) => {
    const rewritten = rewriteRef(value, currentBase, documentURI, index);
    if (rewritten !== undefined && rewritten !== value) {
      replace(rewritten);
      changed = true;
    }
  });

  subschemaPositions(schema).forEach((position) => {
    if (rewriteIdentifierRefs(position.element, currentBase, documentURI, index, warnings)) {
      changed = true;
    }
  });

  return changed;
};

/**
 * Moves a `$ref` that has siblings into `allOf`, so the siblings keep applying in OpenAPI 3.0
 * (where siblings of `$ref` are ignored, and dropped when the reference is inlined). Validation
 * keywords move with it into `allOf`; annotations and extensions stay on the schema, except
 * `nullable`, which only has an effect next to `type` and moves with it.
 */
export const splitRefSiblings = (schema: ObjectElement): void => {
  const ref = schema.get('$ref');
  if (!isStringElement(ref) || schema.length === 1) return;

  const validationKeys = refSiblingValidationKeys(schema);
  if (validationKeys.includes('type') && schema.hasKey('nullable')) validationKeys.push('nullable');

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
  schema.setMetaProperty(REF_SPLIT_META, true);
};

/**
 * Whether a JSON Schema dialect ignores the keywords next to `$ref` (Draft 4, 6 and 7).
 */
export const ignoresRefSiblings = (schemaURI: unknown): boolean =>
  typeof schemaURI === 'string' && /json-schema\.org\/draft-0[4-7]\/schema/.test(schemaURI);

/**
 * Kept next to a `$ref`: `definitions`/`$defs` hold the schemas other references point to, and
 * identifiers are reference targets.
 */
const REF_TARGET_KEYWORDS = new Set([
  '$defs',
  'definitions',
  '$id',
  'id',
  '$schema',
  '$anchor',
  '$dynamicAnchor',
  '$comment',
]);

/**
 * Removes the validation keywords next to a `$ref`, which Draft 4, 6 and 7 ignore, so that the
 * converted schema does not start enforcing them. Annotations, extensions and the keywords that
 * hold reference targets are kept.
 */
export const dropIgnoredRefSiblings = (schema: ObjectElement, warnings: Warnings): void => {
  if (!isStringElement(schema.get('$ref'))) return;
  refSiblingValidationKeys(schema)
    .filter((key) => !REF_TARGET_KEYWORDS.has(key))
    .forEach((key) => {
      warnings.add(
        schema.get(key),
        'dropped-keyword',
        `"${key}" next to "$ref" has no effect in this JSON Schema dialect and was removed`,
      );
      schema.remove(key);
    });
};
