import {
  Element,
  ObjectElement,
  isArrayElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import {
  isExampleElement,
  isLinkElement,
  isPathItemElement,
  isReferenceElement,
  isSchemaElement,
  isServerElement,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { url } from '@swagger-api/apidom-reference';

import { elementAt, forEachElement } from './downgrade/document.ts';
import {
  REF_SPLIT_META,
  forEachMappingRef,
  fragmentTokens,
  isSchemaName,
  setStringValue,
} from './downgrade/refs.ts';
import { forEachSchema, subschemaPositions, unmarkStash } from './downgrade/walk.ts';
import type { Warnings } from './downgrade/index.ts';

const ORIGIN_META = 'ref-origin';
const SOURCE_META = 'conversion-source';

/**
 * Marks an inlined fragment with the document it comes from. The dereference's `ref-origin` names
 * the first document of a chain of references (`a.json` whose fragment is a `$ref` to `b.json`);
 * this mark is copied with the fragment and takes precedence.
 */
export const markFragmentSource = (element: Element, documentURI: string): void =>
  element.setMetaProperty(SOURCE_META, documentURI);

const originOf = (element: Element): string | undefined => {
  const origin = element.meta.get(SOURCE_META) ?? element.meta.get(ORIGIN_META);
  return isStringElement(origin) ? toValue(origin) : undefined;
};

/**
 * The dereference merges a Path Item's `$ref` target with the Path Item's own fields and marks
 * the merged item with the target's document. The own fields are marked here with the document
 * they come from, so that their references are not rebased as the target's.
 */
export const markPathItemFieldOrigins = (element: Element, documentURI: string): void =>
  forEachElement(element, (current) => {
    if (!isPathItemElement(current) || !isStringElement(current.get('$ref'))) return;
    current.forEach((value: Element, key: Element) => {
      if (toValue(key) !== '$ref' && originOf(value) === undefined) {
        value.setMetaProperty(ORIGIN_META, documentURI);
      }
    });
  });

/**
 * Visits every element once, children after their parent, with the origin document URI in
 * effect (the nearest inlined fragment's `ref-origin`). Shared or circular elements are visited
 * once; `onCycle` is called when an element is reached again from inside itself.
 */
const traverse = (
  root: Element,
  entryURI: string,
  visit: (element: Element, origin: string) => void,
  onCycle: (element: Element) => void,
): void => {
  const onStack = new Set<Element>();
  const done = new Set<Element>();

  const walk = (element: Element, inheritedOrigin: string) => {
    if (onStack.has(element)) {
      onCycle(element);
      return;
    }
    if (done.has(element)) return;
    onStack.add(element);

    const origin = originOf(element) ?? inheritedOrigin;
    visit(element, origin);
    if (isObjectElement(element)) {
      element.forEach((value: Element) => walk(value, origin));
    } else if (isArrayElement(element)) {
      (element.content as Element[]).forEach((item) => walk(item, origin));
    }

    onStack.delete(element);
    done.add(element);
  };

  walk(root, entryURI);
};

const isRefracted = (element: Element): boolean =>
  isSchemaElement(element) || isReferenceElement(element);

/**
 * Calls `visit` for every object owned by `element` whose `$ref` is a reference: the element
 * itself when it is a Reference, Schema or Path Item Object and, for a Schema Object, its subschemas the
 * dereference left unrefracted (circular replacements) and the schemas inside the converter's
 * `x-conversion-*` stashes. Data and extensions are never visited.
 */
const forEachRefOwner = (element: Element, visit: (owner: ObjectElement) => void): void => {
  if (isRefracted(element) || isPathItemElement(element)) visit(element as ObjectElement);
  if (!isSchemaElement(element)) return;

  subschemaPositions(element, { stashes: true }).forEach((position) => {
    if (position.path[0] !== position.keyword) {
      forEachSchema(position.element, (schema) => {
        if (isObjectElement(schema)) visit(schema);
      });
    } else if (isObjectElement(position.element) && !isRefracted(position.element)) {
      visit(position.element);
    }
  });
};

/**
 * Resolves a URI read from `origin` and, when it points into the entry document, makes it a
 * fragment again.
 */
const rebaseURI = (value: string, origin: string, entryURI: string): string => {
  const absolute = url.resolve(origin, value);
  return url.stripHash(absolute) === url.stripHash(entryURI) ? url.getHash(absolute) : absolute;
};

const SERVER_VARIABLE = /\{[^}]*\}/g;
const VARIABLE_PLACEHOLDER = /__apidom_variable_(\d+)__/g;

/**
 * Splits an absolute URL or file system path into its host (empty for a path) and the rest, or
 * returns `undefined` when it is neither.
 */
const splitHost = (uri: string): { host: string; path: string } | undefined => {
  if (uri.startsWith('/')) return { host: '', path: uri };
  try {
    const parsed = new URL(uri);
    return {
      host: `${parsed.protocol}//${parsed.host}`,
      path: `${parsed.pathname}${parsed.search}${parsed.hash}`,
    };
  } catch {
    return undefined;
  }
};

/**
 * The path of `target` relative to the directory of `base`, both absolute paths.
 */
const relativePath = (base: string, target: string): string => {
  const from = base.split('/').slice(0, -1);
  const to = target.split('/');
  let common = 0;
  while (common < from.length && common < to.length - 1 && from[common] === to[common]) {
    common += 1;
  }
  const rest = to.slice(common).join('/');
  return from.length === common ? `./${rest}` : `${'../'.repeat(from.length - common)}${rest}`;
};

/**
 * Rebases a Server Object URL read from `origin`: a relative URL, including an empty one, is
 * relative to the document containing the Server Object (OpenAPI 3.0.4). It stays relative when it
 * is on the entry document's host. Absolute and protocol-relative URLs and URLs starting with a
 * server variable are kept; server variables in the rest of the URL are kept as they are.
 */
export const rebaseServerURL = (value: string, origin: string, entryURI: string): string => {
  // absolute, protocol-relative (`//host/...`) or starting with a variable (`{scheme}://...`)
  if (value.startsWith('//') || value.startsWith('{') || url.getProtocol(value) !== undefined) {
    return value;
  }

  const variables: string[] = [];
  const masked = value.replace(SERVER_VARIABLE, (variable) => {
    variables.push(variable);
    return `__apidom_variable_${variables.length - 1}__`;
  });
  const target = splitHost(url.resolve(origin, masked));
  const entry = splitHost(entryURI);
  if (target === undefined || entry === undefined) return value;

  let rebased: string;
  if (target.host !== entry.host) {
    rebased = `${target.host}${target.path}`;
  } else if (value.startsWith('/')) {
    rebased = target.path;
  } else {
    rebased = relativePath(entry.path, target.path);
  }
  return rebased.replace(VARIABLE_PLACEHOLDER, (_match, index) => variables[Number(index)]);
};

/**
 * Rebases URI values read from `origin`. An inlined fragment used in several places shares its
 * subtree between the copies, so every value is rebased once: `rebased` holds the values already
 * done.
 */
const createRebase = (entryURI: string) => {
  const rebased = new WeakSet<Element>();

  const rebaseValue = (value: Element, origin: string, replace: (uri: string) => Element): void => {
    if (!isStringElement(value) || rebased.has(value)) return;
    const uri = rebaseURI(toValue(value), origin, entryURI);
    rebased.add(uri === toValue(value) ? value : replace(uri));
  };

  const rebaseField = (element: ObjectElement, field: string, origin: string): void => {
    const value = element.get(field);
    if (!isStringElement(value)) return;
    rebaseValue(value, origin, (uri) => {
      setStringValue(value, uri);
      return value;
    });
  };

  return (element: Element, origin: string): void => {
    if (origin === entryURI) return;
    forEachRefOwner(element, (owner) => {
      rebaseField(owner, '$ref', origin);
      forEachMappingRef(owner, (_value, replace, mappingValue) =>
        rebaseValue(mappingValue, origin, replace),
      );
    });
    if (isExampleElement(element)) rebaseField(element, 'externalValue', origin);
    if (isLinkElement(element)) rebaseField(element, 'operationRef', origin);
    if (isServerElement(element)) {
      const value = element.get('url');
      if (isStringElement(value) && !rebased.has(value)) {
        setStringValue(value, rebaseServerURL(toValue(value), origin, entryURI));
        rebased.add(value);
      }
    }
  };
};

const isExternal = (element: Element, entryURI: string): boolean => {
  const origin = originOf(element);
  return origin !== undefined && url.stripHash(origin) !== url.stripHash(entryURI);
};

/**
 * Whether a discriminator alternative was inlined from another document: the alternative itself,
 * or, when the converter moved its `$ref` into `allOf` together with its siblings, that `$ref`'s
 * target.
 */
const isInlinedAlternative = (
  element: Element,
  entryURI: string,
  seen: Set<Element> = new Set(),
): boolean => {
  if (isExternal(element, entryURI)) return true;
  if (seen.has(element) || !isObjectElement(element)) return false;
  seen.add(element);
  const allOf = element.get('allOf');
  return (
    toValue(element.meta.get(REF_SPLIT_META)) === true &&
    isArrayElement(allOf) &&
    (allOf.content as Element[]).some((item) => isInlinedAlternative(item, entryURI, seen))
  );
};

const checkDiscriminator = (element: Element, entryURI: string, warnings: Warnings): void => {
  if (!isSchemaElement(element) || !element.hasKey('discriminator')) return;
  const discriminator = element.get('discriminator');

  const alternatives = ['oneOf', 'anyOf'].flatMap((keyword) => {
    const value = element.get(keyword);
    return isArrayElement(value) ? (value.content as Element[]) : [];
  });
  if (alternatives.some((alternative) => isInlinedAlternative(alternative, entryURI))) {
    warnings.add(
      discriminator,
      'discriminator-inlined',
      'An external schema used with "discriminator" was inlined; tools may no longer resolve the discriminator',
    );
  }

  const mapping = isObjectElement(discriminator) ? discriminator.get('mapping') : undefined;
  if (isObjectElement(mapping)) {
    mapping.forEach((value: Element) => {
      const target = String(toValue(value));
      if (target.startsWith('#') || isSchemaName(target)) return;
      warnings.add(
        value,
        'discriminator-mapping-external',
        `The "discriminator.mapping" target "${target}" is external and was not converted`,
      );
    });
  }
};

const checkInheritedDiscriminator = (
  element: Element,
  entryURI: string,
  warnings: Warnings,
): void => {
  if (!isSchemaElement(element)) return;
  const allOf = element.get('allOf');
  if (!isArrayElement(allOf)) return;
  (allOf.content as Element[]).forEach((parent) => {
    if (isObjectElement(parent) && parent.hasKey('discriminator') && isExternal(parent, entryURI)) {
      warnings.add(
        parent,
        'discriminator-inlined',
        'An external parent schema with "discriminator" was inlined into "allOf"; tools may no longer resolve the discriminator',
      );
    }
  });
};

const checkInternalRefs = (element: Element, api: Element, warnings: Warnings): void =>
  forEachRefOwner(element, (owner) => {
    const check = (ref: string, source: Element) => {
      if (!ref.startsWith('#')) return;
      const tokens = fragmentTokens(ref.slice(1));
      if (tokens !== undefined && elementAt(api, tokens) !== undefined) return;
      warnings.add(source, 'unresolved-reference', `The reference "${ref}" does not resolve`);
    };
    const ref = owner.get('$ref');
    if (isStringElement(ref)) check(toValue(ref), ref);
    forEachMappingRef(owner, (value, _replace, mappingValue) => check(value, mappingValue));
  });

export interface PostPassOptions {
  readonly entryURI: string;
  readonly targetMediaType: string;
  readonly circular: string;
}

/**
 * Finishes a converted document: rebases URIs (and relative server URLs) that came with inlined content, reports
 * `discriminator`s broken by inlining, cycles left in memory and internal refs that don't
 * resolve, and sets `openapi` to the target version.
 */
const postPass = (api: Element, options: PostPassOptions, warnings: Warnings): void => {
  let hasCycle = false;
  const rebase = createRebase(options.entryURI);

  traverse(
    api,
    options.entryURI,
    (element, origin) => {
      rebase(element, origin);
      checkDiscriminator(element, options.entryURI, warnings);
      checkInheritedDiscriminator(element, options.entryURI, warnings);
    },
    () => {
      hasCycle = true;
    },
  );

  traverse(
    api,
    options.entryURI,
    (element) => {
      checkInternalRefs(element, api, warnings);
      unmarkStash(element);
      element.meta.remove(SOURCE_META);
      element.meta.remove(REF_SPLIT_META);
    },
    () => {},
  );

  if (hasCycle && options.circular === 'ignore') {
    warnings.add(
      api,
      'circular-reference',
      'The converted document contains circular references and cannot be serialized as JSON or YAML; set dereference.circular to "replace" with a circularReplacer, or to "error"',
    );
  }

  const version = /version=([0-9.]+)/.exec(options.targetMediaType)?.[1];
  const openapi = isObjectElement(api) ? api.get('openapi') : undefined;
  if (version !== undefined && isStringElement(openapi)) {
    // changed in place, so that the element keeps its OpenAPI type
    (openapi.content as unknown as string) = version;
  }
};

export default postPass;
