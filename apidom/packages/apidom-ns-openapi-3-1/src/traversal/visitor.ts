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
    ? 'Callback'
    : isComponentsElement(element)
    ? 'Components'
    : isContactElement(element)
    ? 'Contact'
    : isExternalDocumentationElement(element)
    ? 'ExternalDocumentation'
    : isInfoElement(element)
    ? 'Info'
    : isLicenseElement(element)
    ? 'License'
    : isOpenapiElement(element)
    ? 'Openapi'
    : isOpenApi3_1Element(element)
    ? 'OpenApi3_1'
    : isOperationElement(element)
    ? 'Operation'
    : isParameterElement(element)
    ? 'Parameter'
    : isPathItemElement(element)
    ? 'PathItem'
    : isPathsElement(element)
    ? 'Paths'
    : isReferenceElement(element)
    ? 'Reference'
    : isRequestBodyElement(element)
    ? 'RequestBody'
    : isResponseElement(element)
    ? 'Response'
    : isResponsesElement(element)
    ? 'Responses'
    : isSchemaElement(element)
    ? 'Schema'
    : isSecurityRequirementElement(element)
    ? 'SecurityRequirement'
    : isServerElement(element)
    ? 'Server'
    : isServerVariableElement(element)
    ? 'ServerVariable'
    : getNodeTypeBase(element);
  /* eslint-enable */
};

export const keyMapDefault = {
  ...keyMapBase,
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
