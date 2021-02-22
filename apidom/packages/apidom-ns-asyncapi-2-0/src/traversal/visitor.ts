import { propOr } from 'ramda';
import { Element, visit as astVisit, keyMap as keyMapBase, BREAK } from 'apidom';
import { isString } from 'ramda-adjunct';

export { BREAK };

export const getNodeType = <T extends Element>(element: Element) =>
  isString(element.element)
    ? element.element.charAt(0).toUpperCase() + element.element.slice(1)
    : undefined;

export const keyMapDefault = {
  AsyncApi2_0: ['content'],
  ChannelBindings: ['content'],
  ChannelItem: ['content'],
  Channels: ['content'],
  Components: ['content'],
  Contact: ['content'],
  Info: ['content'],
  License: ['content'],
  Operation: ['content'],
  Parameter: ['content'],
  Parameters: ['content'],
  Reference: ['content'],
  Schema: ['content'],
  SecurityRequirement: ['content'],
  Server: ['content'],
  ServerBinding: ['content'],
  Servers: ['content'],
  ServerVariable: ['content'],
  ...keyMapBase,
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
