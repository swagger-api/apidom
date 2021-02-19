import { propOr } from 'ramda';
import {
  Element,
  visit as astVisit,
  keyMap as keyMapBase,
  getNodeType as getNodeTypeBase,
} from 'apidom';
import {
  isCallbackElement,
  isComponentsElement,
  isContactElement,
  isExternalDocumentationElement,
  isInfoElement,
  isLicenseElement,
  isOpenapiElement,
  isOpenApi3_1Element,
  isOperationElement,
  isParameterElement,
  isPathItemElement,
  isPathsElement,
  isReferenceElement,
  isRequestBodyElement,
  isResponseElement,
  isResponsesElement,
  isSchemaElement,
  isSecurityRequirementElement,
  isServerElement,
  isServerVariableElement,
} from '../predicates';

export { BREAK } from 'apidom';

export const getNodeType = <T extends Element>(element: T): string | undefined => {
  /* eslint-disable no-nested-ternary */
  return isCallbackElement(element)
    ? 'callback'
    : isComponentsElement(element)
    ? 'components'
    : isContactElement(element)
    ? 'contact'
    : isExternalDocumentationElement(element)
    ? 'externalDocumentation'
    : isInfoElement(element)
    ? 'info'
    : isLicenseElement(element)
    ? 'license'
    : isOpenapiElement(element)
    ? 'openapi'
    : isOpenApi3_1Element(element)
    ? 'openApi3-1'
    : isOperationElement(element)
    ? 'operation'
    : isParameterElement(element)
    ? 'parameter'
    : isPathItemElement(element)
    ? 'pathItem'
    : isPathsElement(element)
    ? 'paths'
    : isReferenceElement(element)
    ? 'reference'
    : isRequestBodyElement(element)
    ? 'requestBody'
    : isResponseElement(element)
    ? 'response'
    : isResponsesElement(element)
    ? 'responses'
    : isSchemaElement(element)
    ? 'schema'
    : isSecurityRequirementElement(element)
    ? 'securityRequirement'
    : isServerElement(element)
    ? 'server'
    : isServerVariableElement(element)
    ? 'serverVariable'
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
