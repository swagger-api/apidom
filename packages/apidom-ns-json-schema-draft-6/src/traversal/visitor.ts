import { keyMap as keyMapBase, isElement, Element } from '@swagger-api/apidom-core';

/**
 * @public
 */
export const getNodeType = <T extends Element>(element: T): string | undefined => {
  if (!isElement(element)) {
    return undefined;
  }
  return `${element.element.charAt(0).toUpperCase() + element.element.slice(1)}Element`;
};

/**
 * @public
 */
export const keyMap = {
  JSONSchemaDraft6Element: ['content'],
  JSONReferenceElement: ['content'],
  MediaElement: ['content'],
  LinkDescriptionElement: ['content'],
  ...keyMapBase,
};
