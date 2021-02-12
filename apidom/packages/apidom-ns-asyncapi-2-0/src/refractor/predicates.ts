import { MemberElement, isStringElement, isObjectElement, Element } from 'apidom';
import { startsWith } from 'ramda';

export const isAsyncApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', element.key.toValue());
};

export const isReferenceLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('$ref');
};
