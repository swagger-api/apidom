import { startsWith } from 'ramda';
import { MemberElement, isStringElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

// eslint-disable-next-line import/prefer-default-export
export const isWorkflowsSpecificationExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};

export const isSourceDescriptionLikeElement = isObjectElement;
