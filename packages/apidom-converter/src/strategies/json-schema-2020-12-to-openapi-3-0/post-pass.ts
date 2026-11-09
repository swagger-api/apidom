import {
  Element,
  isArrayElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import { isSchemaElement } from '@swagger-api/apidom-ns-openapi-3-0';
import { url } from '@swagger-api/apidom-reference';

import { elementAt } from './downgrade/document.ts';
import { fragmentTokens } from './downgrade/refs.ts';
import type { Warnings } from './downgrade/index.ts';

const ORIGIN_META = 'ref-origin';
const URI_FIELDS = ['$ref', 'externalValue', 'operationRef'] as const;

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

const rebase = (element: Element, origin: string, entryURI: string): void => {
  if (!isObjectElement(element) || origin === entryURI) return;
  URI_FIELDS.forEach((field) => {
    const value = element.get(field);
    if (!isStringElement(value)) return;
    const absolute = url.resolve(origin, toValue(value));
    const rebased =
      url.stripHash(absolute) === url.stripHash(entryURI) ? url.getHash(absolute) : absolute;
    if (rebased !== toValue(value)) element.set(field, rebased);
  });
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
      if (target.startsWith('#') || /^[a-zA-Z0-9.\-_]+$/.test(target)) return;
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

const checkInternalRef = (element: Element, api: Element, warnings: Warnings): void => {
  if (!isObjectElement(element)) return;
  const ref = element.get('$ref');
  if (!isStringElement(ref) || !toValue(ref).startsWith('#')) return;
  if (elementAt(api, fragmentTokens(toValue(ref).slice(1))) === undefined) {
    warnings.add(ref, 'unresolved-reference', `The reference "${toValue(ref)}" does not resolve`);
  }
};

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
    (element) => checkInternalRef(element, api, warnings),
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
