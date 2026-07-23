import { startsWith } from 'ramda';
import { MemberElement, isStringElement, toValue } from '@swagger-api/apidom-core';

/**
 * @public
 */
const isA2ASpecificationExtension = (element: MemberElement): boolean => {
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};

export default isA2ASpecificationExtension;
