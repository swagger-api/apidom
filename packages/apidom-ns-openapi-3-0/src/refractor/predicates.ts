import { MemberElement, isStringElement, isObjectElement, Element } from '@swagger-api/apidom-core';
import { startsWith } from 'ramda';

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

export const isHeaderLikeElement = isObjectElement;

export const isPathItemLikeElement = isObjectElement;

export const isExampleLikeElement = isObjectElement;

export const isLinkLikeElement = isObjectElement;

export const isCallbackLikeElement = isObjectElement;

export const isSecuritySchemeLikeElement = <T extends Element>(element: T): boolean => {
  return (
    isObjectElement(element) &&
    // @ts-ignore
    element.hasKey('type') &&
    // @ts-ignore
    element.hasKey('name') &&
    // @ts-ignore
    element.hasKey('in') &&
    // @ts-ignore
    element.hasKey('scheme') &&
    // @ts-ignore
    elememt.hasKey('flows')
  );
};

export const isTagLikeElement = isObjectElement;

export const isOpenApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', element.key.toValue());
};
