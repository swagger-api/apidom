import { propOr } from 'ramda';
import {
  Element,
  visit as astVisit,
  keyMap as keyMapBase,
  getNodeType as getNodeTypeBase,
} from 'apidom';
import { isReferenceElement } from '../predicates';

export { BREAK } from 'apidom';

export const getNodeType = <T extends Element>(element: T): string | undefined => {
  return isReferenceElement(element) ? 'reference' : getNodeTypeBase(element);
};

export const keyMapDefault = {
  ...keyMapBase,
  reference: ['content'],
};

export const visit = (
  root: Element,
  // @ts-ignore
  visitor,
  { keyMap = keyMapDefault, ...rest } = {},
): Element => {
  // if visitor is associated with the keymap, we prefer this visitor keymap
  const effectiveKeyMap = propOr(keyMap, 'keyMap', visitor);

  // @ts-ignore
  return astVisit(root, visitor, {
    // @ts-ignore
    keyMap: effectiveKeyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    ...rest,
  });
};

// @ts-ignore
visit[Symbol.for('nodejs.util.promisify.custom')] = async (
  root: Element,
  // @ts-ignore
  visitor,
  { keyMap = keyMapDefault, ...rest } = {},
): Promise<Element> => {
  // if visitor is associated with the keymap, we prefer this visitor keymap
  const effectiveKeyMap = propOr(keyMap, 'keyMap', visitor);

  // @ts-ignore
  return astVisit[Symbol.for('nodejs.util.promisify.custom')](root, visitor, {
    // @ts-ignore
    keyMap: effectiveKeyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    ...rest,
  });
};
