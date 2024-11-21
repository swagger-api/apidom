import { isObjectElement, ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
export interface JSONReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

// eslint-disable-next-line import/prefer-default-export
/**
 * @public
 */
export const isJSONReferenceLikeElement = (
  element: unknown,
): element is JSONReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
};
