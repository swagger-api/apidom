import { reduceRight } from 'ramda';
import { Element } from 'apidom';
import { SchemaElement } from 'apidom-ns-openapi-3-1';

import * as url from '../../../util/url';

/**
 * Folding of inherited$id list from right to left using
 * URL resolving mechanism.
 */
export const resolveInherited$id = (schemaElement: SchemaElement) =>
  reduceRight(
    ($id: string, acc: string): string => {
      const uriWithoutHash = url.stripHash($id);
      const sanitizedURI = url.isFileSystemPath(uriWithoutHash)
        ? url.fromFileSystemPath(uriWithoutHash)
        : uriWithoutHash;

      return url.resolve(sanitizedURI, acc);
    },
    schemaElement.$ref?.toValue(),
    schemaElement.meta.get('inherited$id').toValue(),
  );

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
