import { isObjectElement, Element } from '@swagger-api/apidom-core';

// eslint-disable-next-line @typescript-eslint/naming-convention, import/prefer-default-export
export const isOpenApi3_1LikeElement = <T extends Element>(element: T): boolean => {
  // @ts-ignore
  return isObjectElement(element) && element.hasKey('openapi') && element.hasKey('info');
};
