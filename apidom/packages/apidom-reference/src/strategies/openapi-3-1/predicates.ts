import { complement, pathSatisfies, startsWith, both } from 'ramda';
import { isReferenceElement } from 'apidom-ns-openapi-3-1';

export const isExternalReferenceElement = both(
  isReferenceElement,
  pathSatisfies(complement(startsWith('#')), ['$ref']),
);

export { isReferenceElement };
