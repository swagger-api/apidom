import { startsWith } from 'ramda';
import { isStringElement } from 'apidom';
import { isReferenceElement } from 'apidom-ns-openapi-3-1';

export const isExternalReferenceElement = (element: any): boolean => {
  if (!isReferenceElement(element)) {
    return false;
  }
  // @ts-ignore
  const $refElement = element.$ref;

  if (!isStringElement($refElement)) {
    return false;
  }

  return !startsWith('#', $refElement.toValue());
};

export { isReferenceElement };
