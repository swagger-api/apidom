import { startsWith } from 'ramda';
import {
  MemberElement,
  isStringElement,
  isObjectElement,
  Element,
  toValue,
} from '@swagger-api/apidom-core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const isWorkflowsSpecificationLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('workflowsSpec') && element.hasKey('info');
};

export const isWorkflowsSpecificationExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};
