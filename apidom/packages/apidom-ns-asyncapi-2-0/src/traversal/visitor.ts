import { propOr } from 'ramda';
import {
  Element,
  visit as astVisit,
  keyMap as keyMapBase,
  getNodeType as getNodeTypeBase,
} from 'apidom';
import {
  isServerElement,
  isSchemaElement,
  isServerVariableElement,
  isParameterElement,
  isLicenseElement,
  isInfoElement,
  isContactElement,
  isComponentsElement,
  isAsyncApiVersionElement,
  isReferenceElement,
  isAsyncApi2_0Element,
  isChannelItemElement,
  isChannelsElement,
  isIdentifierElement,
  isServersElement,
} from '../predicates';

export { BREAK } from 'apidom';

export const getNodeType = <T extends Element>(element: T): string | undefined => {
  /* eslint-disable no-nested-ternary */
  return isServerElement(element)
    ? 'Server'
    : isSchemaElement(element)
    ? 'Schema'
    : isServerVariableElement(element)
    ? 'ServerVariable'
    : isParameterElement(element)
    ? 'Parameter'
    : isLicenseElement(element)
    ? 'License'
    : isInfoElement(element)
    ? 'Info'
    : isContactElement(element)
    ? 'Contact'
    : isComponentsElement(element)
    ? 'Components'
    : isAsyncApi2_0Element(element)
    ? 'AsyncApi2_0'
    : isAsyncApiVersionElement(element)
    ? 'AsyncApiVersion'
    : isChannelItemElement(element)
    ? 'ChannelItem'
    : isChannelsElement(element)
    ? 'Channels'
    : isIdentifierElement(element)
    ? 'Identifier'
    : isServersElement(element)
    ? 'Servers'
    : isReferenceElement(element)
    ? 'Reference'
    : getNodeTypeBase(element);
  /* eslint-enable */
};

export const keyMapDefault = {
  ...keyMapBase,
  Server: ['content'],
  Schema: ['content'],
  ServerVariable: ['content'],
  Parameter: ['content'],
  License: ['content'],
  Info: ['content'],
  Contact: ['content'],
  Components: ['content'],
  AsyncApi2_0: ['content'],
  ChannelItem: ['content'],
  Channels: ['content'],
  Servers: ['content'],
  Reference: ['content'],
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
