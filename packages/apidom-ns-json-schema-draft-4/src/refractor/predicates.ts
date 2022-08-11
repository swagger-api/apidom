import { isObjectElement, Element } from '@swagger-api/apidom-core';

// eslint-disable-next-line import/prefer-default-export
export const isJSONReferenceLikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('$ref');
};
