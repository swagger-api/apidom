import { startsWith } from 'ramda';
import { ObjectElement } from 'minim';
import { MemberElement, isStringElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

export interface ReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

export const isReferenceLikeElement = (element: unknown): element is ReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
};

export const isServerLikeElement = isObjectElement;

export const isTagLikeElement = isObjectElement;

export const isOpenApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};
