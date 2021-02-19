import { MemberElement, isStringElement, isObjectElement, Element } from 'apidom';
import { startsWith } from 'ramda';

export const isOpenApi3_1LikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('openapi') && element.hasKey('info');
};

export const isParameterLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('name') && element.hasKey('in');
};

export const isReferenceLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('$ref');
};

export const isRequestBodyLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('content');
};

export const isResponseLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('description');
};

export const isServerLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('url');
};

export const isOpenApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', element.key.toValue());
};
