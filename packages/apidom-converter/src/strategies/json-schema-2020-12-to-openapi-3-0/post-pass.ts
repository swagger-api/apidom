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
  isReferenceElement,
  isSchemaElement,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { url } from '@swagger-api/apidom-reference';

import { elementAt } from './downgrade/document.ts';
import { forEachMappingRef, fragmentTokens, isSchemaName } from './downgrade/refs.ts';
import { forEachSchema, subschemaPositions, unmarkStash } from './downgrade/walk.ts';
import type { Warnings } from './downgrade/index.ts';

const ORIGIN_META = 'ref-origin';

const originOf = (element: Element): string | undefined => {
  const origin = element.meta.get(ORIGIN_META);
  return isStringElement(origin) ? toValue(origin) : undefined;
};

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
 * itself when it is a Reference or Schema Object and, for a Schema Object, its subschemas the
 * dereference left unrefracted (circular replacements) and the schemas inside the converter's
 * `x-conversion-*` stashes. Data and extensions are never visited.
 */
const forEachRefOwner = (element: Element, visit: (owner: ObjectElement) => void): void => {
  if (isRefracted(element)) visit(element as ObjectElement);
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

const rebaseField = (
  element: ObjectElement,
  field: string,
  origin: string,
  entryURI: string,
): void => {
  const value = element.get(field);
  if (!isStringElement(value)) return;
  const rebased = rebaseURI(toValue(value), origin, entryURI);
  if (rebased !== toValue(value)) element.set(field, rebased);
};

const rebase = (element: Element, origin: string, entryURI: string): void => {
  if (origin === entryURI) return;
  forEachRefOwner(element, (owner) => {
    rebaseField(owner, '$ref', origin, entryURI);
    forEachMappingRef(owner, (value, replace) => {
      const rebased = rebaseURI(value, origin, entryURI);
      if (rebased !== value) replace(rebased);
    });
  });
  if (isExampleElement(element)) rebaseField(element, 'externalValue', origin, entryURI);
  if (isLinkElement(element)) rebaseField(element, 'operationRef', origin, entryURI);
};

const isExternal = (element: Element, entryURI: string): boolean => {
  const origin = originOf(element);
  return origin !== undefined && url.stripHash(origin) !== url.stripHash(entryURI);
};

const checkDiscriminator = (element: Element, entryURI: string, warnings: Warnings): void => {
  if (!isSchemaElement(element) || !element.hasKey('discriminator')) return;
  const discriminator = element.get('discriminator');

  const alternatives = ['oneOf', 'anyOf'].flatMap((keyword) => {
    const value = element.get(keyword);
    return isArrayElement(value) ? (value.content as Element[]) : [];
  });
  if (alternatives.some((alternative) => isExternal(alternative, entryURI))) {
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
 * Finishes a converted document: rebases URIs that came with inlined content, reports
 * `discriminator`s broken by inlining, cycles left in memory and internal refs that don't
 * resolve, and sets `openapi` to the target version.
 */
const postPass = (api: Element, options: PostPassOptions, warnings: Warnings): void => {
  let hasCycle = false;

  traverse(
    api,
    options.entryURI,
    (element, origin) => {
      rebase(element, origin, options.entryURI);
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
  if (version !== undefined && isObjectElement(api) && api.hasKey('openapi')) {
    api.set('openapi', version);
  }
};

export default postPass;
