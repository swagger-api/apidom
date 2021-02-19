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
    ? 'server'
    : isSchemaElement(element)
    ? 'schema'
    : isServerVariableElement(element)
    ? 'serverVariable'
    : isParameterElement(element)
    ? 'parameter'
    : isLicenseElement(element)
    ? 'license'
    : isInfoElement(element)
    ? 'info'
    : isContactElement(element)
    ? 'contact'
    : isComponentsElement(element)
    ? 'components'
    : isAsyncApi2_0Element(element)
    ? 'asyncApi2_0'
    : isAsyncApiVersionElement(element)
    ? 'asyncApiVersion'
    : isChannelItemElement(element)
    ? 'channelItem'
    : isChannelsElement(element)
    ? 'channels'
    : isIdentifierElement(element)
    ? 'identifier'
    : isServersElement(element)
    ? 'servers'
    : isReferenceElement(element)
    ? 'reference'
    : getNodeTypeBase(element);
  /* eslint-enable */
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
