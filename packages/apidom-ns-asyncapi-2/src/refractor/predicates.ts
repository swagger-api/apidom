import { startsWith } from 'ramda';
import { MemberElement, isStringElement, isObjectElement, toValue } from '@swagger-api/apidom-core';
import { ObjectElement } from 'minim';

export interface ReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

export const isReferenceLikeElement = (element: unknown): element is ReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
};

export const isAsyncApiExtension = (element: MemberElement): boolean => {
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};
