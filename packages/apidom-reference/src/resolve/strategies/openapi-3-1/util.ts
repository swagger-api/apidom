import { reduce } from 'ramda';
import { Element, isPrimitiveElement } from 'apidom';
import { SchemaElement } from 'apidom-ns-openapi-3-1';

import * as url from '../../../util/url';

/**
 * Folding of inherited$id list from left to right using
 * URL resolving mechanism.
 */
export const resolveInherited$id = (baseURI: string, schemaElement: SchemaElement) => {
  const inherited$id = schemaElement.meta.get('inherited$id').toValue();

  return reduce(
    (acc: string, $id: string): string => {
      const uriWithoutHash = url.stripHash($id);
      const sanitizedURI = url.isFileSystemPath(uriWithoutHash)
        ? url.fromFileSystemPath(uriWithoutHash)
        : uriWithoutHash;

      return url.resolve(acc, sanitizedURI);
    },
    baseURI,
    [...inherited$id, schemaElement.$ref?.toValue()],
  );
};

/**
 * Cached version of SchemaElement.refract.
 */
export const refractToSchemaElement = <T extends Element>(element: T) => {
  if (refractToSchemaElement.cache.has(element)) {
    return refractToSchemaElement.cache.get(element);
  }

  const refracted = SchemaElement.refract(element);
  refractToSchemaElement.cache.set(element, refracted);
  return refracted;
};
refractToSchemaElement.cache = new WeakMap();

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
