import { propOr } from 'ramda';
import { isString } from 'ramda-adjunct';
import { Element, visit as astVisit, keyMap as keyMapBase, BREAK } from 'apidom';

export { BREAK };

export const getNodeType = <T extends Element>(element: Element) =>
  isString(element.element)
    ? element.element.charAt(0).toUpperCase() + element.element.slice(1)
    : undefined;

export const keyMapDefault = {
  Callback: ['content'],
  Components: ['content'],
  Contact: ['content'],
  ExternalDocumentation: ['content'],
  Info: ['content'],
  License: ['content'],
  OpenApi3_1: ['content'],
  Operation: ['content'],
  Parameter: ['content'],
  PathItem: ['content'],
  Paths: ['content'],
  Reference: ['content'],
  RequestBody: ['content'],
  Response: ['content'],
  Responses: ['content'],
  Schema: ['content'],
  SecurityRequirement: ['content'],
  Server: ['content'],
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
