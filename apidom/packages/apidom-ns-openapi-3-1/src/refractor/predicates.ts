import { MemberElement, isStringElement, isObjectElement, Element } from 'apidom';
import { startsWith, all } from 'ramda';

export const isOpenApi3_1LikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('openapi') && element.hasKey('info');
};

export const isParameterLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('name') && element.hasKey('in');
};

export const isReferenceLikeElement = <T extends Element>(element: T): boolean => {
  const isAllowedProperty = (property: string): boolean => {
    // @ts-ignore
    return ['$ref', 'description', 'summary'].includes(property);
  };

  return (
    isObjectElement(element) &&
    // @ts-ignore
    element.hasKey('$ref') &&
    // @ts-ignore
    element.keys.length <= 3 &&
    // @ts-ignore
    all(isAllowedProperty)(element.keys)
  );
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

export const isPathItemLikeElement = isObjectElement;

export const isOpenApiExtension = (element: MemberElement): boolean => {
  // @ts-ignore
  return isStringElement(element.key) && startsWith('x-', element.key.toValue());
};
