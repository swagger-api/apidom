import { startsWith } from 'ramda';
import { ObjectElement } from 'minim';
import { MemberElement, isStringElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

/**
 * @public
 */
export interface ReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

/**
 * @public
 */
export const isReferenceLikeElement = (element: unknown): element is ReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
};

/**
 * @public
 */
export const isServerLikeElement = isObjectElement;

/**
 * @public
 */
export const isTagLikeElement = isObjectElement;

/**
 * @public
 */
export const isOpenApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};
