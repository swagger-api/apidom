import { startsWith } from 'ramda';
import {
  MemberElement,
  isStringElement,
  isObjectElement,
  Element,
  toValue,
} from '@swagger-api/apidom-core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const isOpenApi3_0LikeElement = <T extends Element>(element: T): boolean => {
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

export const isServerLikeElement = isObjectElement;

export const isTagLikeElement = isObjectElement;

export const isOpenApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', toValue(element.key));
};
