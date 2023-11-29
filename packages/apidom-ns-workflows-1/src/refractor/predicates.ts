import { startsWith } from 'ramda';
import {
  MemberElement,
  ObjectElement,
  isStringElement,
  toValue,
  isObjectElement,
} from '@swagger-api/apidom-core';

export interface ReferenceLikeElement extends ObjectElement {
  hasKey: (value: '$ref') => true;
}

// eslint-disable-next-line import/prefer-default-export
export const isWorkflowsSpecificationExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};

export const isReferenceLikeElement = (element: unknown): element is ReferenceLikeElement => {
  return isObjectElement(element) && element.hasKey('$ref');
};
