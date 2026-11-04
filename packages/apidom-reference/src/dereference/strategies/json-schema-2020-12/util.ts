import { reduce } from 'ramda';
import { Element, isPrimitiveElement, toValue } from '@swagger-api/apidom-core';
import { JSONSchemaElement, refract } from '@swagger-api/apidom-ns-json-schema-2020-12';

import * as url from '../../../util/url.ts';

/**
 * @public
 */
export const resolveSchema$refField = (retrievalURI: string, schemaElement: JSONSchemaElement) => {
  if (typeof schemaElement.$ref === 'undefined') {
    return undefined;
  }

  const hash = url.getHash(toValue(schemaElement.$ref));
  const ancestorsSchemaIdentifiers = toValue(schemaElement.meta.get('ancestorsSchemaIdentifiers'));
  const $refBaseURI = reduce(
    (acc: string, uri: string): string => {
      return url.resolve(acc, url.sanitize(url.stripHash(uri)));
    },
    retrievalURI,
    [...ancestorsSchemaIdentifiers, toValue(schemaElement.$ref)],
  );

  return `${$refBaseURI}${hash === '#' ? '' : hash}`;
};

/**
 * @public
 */
export const resolveSchema$idField = (retrievalURI: string, schemaElement: JSONSchemaElement) => {
  if (typeof schemaElement.$id === 'undefined') {
    return undefined;
  }

  const ancestorsSchemaIdentifiers = toValue(schemaElement.meta.get('ancestorsSchemaIdentifiers'));

  return reduce(
    (acc: string, $id: string): string => {
      return url.resolve(acc, url.sanitize(url.stripHash($id)));
    },
    retrievalURI,
    ancestorsSchemaIdentifiers,
  );
};

/**
 * Cached refraction to JSONSchemaElement.
 *
 * Uses the namespace refractor rather than `JSONSchemaElement.refract`: that static property
 * is shared with namespaces building on JSON Schema 2020-12, and apidom-ns-arazzo-1 reassigns
 * it to a refractor with its own specification.
 */
export const refractToSchemaElement = <T extends Element>(element: T) => {
  if (refractToSchemaElement.cache.has(element)) {
    return refractToSchemaElement.cache.get(element);
  }

  const refracted = refract<JSONSchemaElement>(element);
  refractToSchemaElement.cache.set(element, refracted);
  return refracted;
};
refractToSchemaElement.cache = new WeakMap();

/**
 * @public
 */
export const maybeRefractToSchemaElement = <T extends Element>(element: T) => {
  /**
   * Conditional version of refractToSchemaElement, that acts as an identity
   * function for all non-primitive Element instances.
   */
  if (isPrimitiveElement(element)) {
    return refractToSchemaElement(element);
  }

  return element;
};
