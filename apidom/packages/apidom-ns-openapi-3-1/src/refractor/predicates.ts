import { MemberElement, isStringElement, isObjectElement, Element } from 'apidom';
import { startsWith } from 'ramda';

export const isOpenApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', element.key.toValue());
};

export const isServerLikeElement = <T extends Element>(element: Element): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('url');
};
