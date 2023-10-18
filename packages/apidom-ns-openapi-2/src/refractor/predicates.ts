import { startsWith } from 'ramda';
import {
  MemberElement,
  ObjectElement,
  isStringElement,
  toValue,
  isObjectElement,
} from '@swagger-api/apidom-core';

interface ReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

export const isSwaggerExtension = (element: MemberElement): boolean => {
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};

export const isReferenceLikeElement = (element: unknown): element is ReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
};
