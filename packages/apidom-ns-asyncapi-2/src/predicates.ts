import { BooleanElement, createPredicate, isBooleanElement } from '@swagger-api/apidom-core';
import type { ElementPredicate } from '@swagger-api/apidom-core';

import AsyncApi2Element from './elements/AsyncApi2.ts';
import AsyncApiVersionElement from './elements/AsyncApiVersion.ts';
import ChannelBindingsElement from './elements/ChannelBindings.ts';
import ChannelItemElement from './elements/ChannelItem.ts';
import ChannelsElement from './elements/Channels.ts';
import ComponentsElement from './elements/Components.ts';
import ContactElement from './elements/Contact.ts';
import IdentifierElement from './elements/Identifier.ts';
import InfoElement from './elements/Info.ts';
import LicenseElement from './elements/License.ts';
import OperationElement from './elements/Operation.ts';
import ParameterElement from './elements/Parameter.ts';
import ParametersElement from './elements/Parameters.ts';
import ReferenceElement from './elements/Reference.ts';
import SchemaElement from './elements/Schema.ts';
import SecurityRequirementElement from './elements/SecurityRequirement.ts';
import ServerElement from './elements/Server.ts';
import ServerBindingsElement from './elements/ServerBindings.ts';
import ServersElement from './elements/Servers.ts';
import ServerVariableElement from './elements/ServerVariable.ts';

/**
 * @public
 */
export const isAsyncApi2Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AsyncApi2Element =>
      (element instanceof AsyncApi2Element && element.constructor === AsyncApi2Element) ||
      (hasBasicElementProps(element) &&
        isElementType('asyncApi2', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element));
  },
);

/**
 * @public
 */
export const isAsyncApiVersionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is AsyncApiVersionElement =>
      element instanceof AsyncApiVersionElement ||
      (hasBasicElementProps(element) &&
        isElementType('asyncApiVersion', element) &&
        primitiveEq('string', element));
  },
);

/**
 * @public
 */
export const isChannelBindingsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ChannelBindingsElement =>
      element instanceof ChannelBindingsElement ||
      (hasBasicElementProps(element) &&
        isElementType('channelBindings', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isChannelItemElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ChannelItemElement =>
      element instanceof ChannelItemElement ||
      (hasBasicElementProps(element) &&
        isElementType('channelItem', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isChannelsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ChannelsElement =>
      element instanceof ChannelsElement ||
      (hasBasicElementProps(element) &&
        isElementType('channels', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ComponentsElement =>
      element instanceof ComponentsElement ||
      (hasBasicElementProps(element) &&
        isElementType('components', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isContactElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ContactElement =>
      element instanceof ContactElement ||
      (hasBasicElementProps(element) &&
        isElementType('contact', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isIdentifierElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is IdentifierElement =>
      element instanceof IdentifierElement ||
      (hasBasicElementProps(element) &&
        isElementType('identifier', element) &&
        primitiveEq('string', element));
  },
);

/**
 * @public
 */
export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is InfoElement =>
      element instanceof InfoElement ||
      (hasBasicElementProps(element) &&
        isElementType('info', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isLicenseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is LicenseElement =>
      element instanceof LicenseElement ||
      (hasBasicElementProps(element) &&
        isElementType('license', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isOperationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is OperationElement =>
      element instanceof OperationElement ||
      (hasBasicElementProps(element) &&
        isElementType('operation', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isParameterElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParameterElement =>
      element instanceof ParameterElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameter', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isParametersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParametersElement =>
      element instanceof ParametersElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameters', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ReferenceElement =>
      element instanceof ReferenceElement ||
      (hasBasicElementProps(element) &&
        isElementType('reference', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SchemaElement =>
      element instanceof SchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('schema', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isBooleanJsonSchemaElement: ElementPredicate<BooleanElement> = (
  element: unknown,
): element is BooleanElement => {
  return isBooleanElement(element) && element.classes.includes('boolean-json-schema');
};

/**
 * @public
 */
export const isSecurityRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SecurityRequirementElement =>
      element instanceof SecurityRequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityRequirement', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isServerElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerElement =>
      element instanceof ServerElement ||
      (hasBasicElementProps(element) &&
        isElementType('server', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isServerBindingsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerBindingsElement =>
      element instanceof ServerBindingsElement ||
      (hasBasicElementProps(element) &&
        isElementType('serverBindings', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isServersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServersElement =>
      element instanceof ServersElement ||
      (hasBasicElementProps(element) &&
        isElementType('servers', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isServerVariableElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerVariableElement =>
      element instanceof ServerVariableElement ||
      (hasBasicElementProps(element) &&
        isElementType('serverVariable', element) &&
        primitiveEq('object', element));
  },
);
