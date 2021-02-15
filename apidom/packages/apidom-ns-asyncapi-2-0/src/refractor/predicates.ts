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

export const isServerLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('url') && element.hasKey('protocol');
};

export const isSecurityRequirementLikeElement = <T extends Element>(element: T): boolean => {
  return isObjectElement(element);
};

export const isParameterLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element);
};

export const isSchemaLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element);
};
