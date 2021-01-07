import { startsWith } from 'ramda';
import { isNonEmptyString } from 'ramda-adjunct';
import { isStringElement, isObjectElement } from 'apidom';
import { isReferenceElement } from 'apidom-ns-openapi-3-1';

/**
 * Identifies external Reference Object from OpenApi 3.1.x specification.
 */
export const isExternalReferenceElement = (element: any): boolean => {
  if (!isReferenceElement(element)) {
    return false;
  }
  // @ts-ignore
  const $refElement = element.$ref;

  if (!isStringElement($refElement)) {
    return false;
  }

  const value = $refElement.toValue();

  return isNonEmptyString(value) && !startsWith('#', value);
};

/**
 * Identifies any shape that resembles Reference Object from OpenApi 3.1.x specification.
 */
export const isReferenceLikeElement = (element: any): boolean => {
  if (!isObjectElement(element)) {
    return false;
  }

  return element.hasKey('$ref');
};

/**
 * Identifies any shape that resembles external Reference Object from OpenApi 3.1.x specification.
 */
export const isExternalReferenceLikeElement = (element: any): boolean => {
  if (!isReferenceLikeElement(element)) {
    return false;
  }

  // @ts-ignore
  const $refElement = element.get('$ref');

  if (!isStringElement($refElement)) {
    return false;
  }

  return !startsWith('#', $refElement.toValue());
};

export { isReferenceElement };
