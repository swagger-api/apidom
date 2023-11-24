import { BooleanElement, createPredicate, isBooleanElement } from '@swagger-api/apidom-core';
import type { ElementPredicate } from '@swagger-api/apidom-core';

import AsyncApi2Element from './elements/AsyncApi2';
import AsyncApiVersionElement from './elements/AsyncApiVersion';
import ChannelBindingsElement from './elements/ChannelBindings';
import ChannelItemElement from './elements/ChannelItem';
import ChannelsElement from './elements/Channels';
import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import IdentifierElement from './elements/Identifier';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import ParametersElement from './elements/Parameters';
import ReferenceElement from './elements/Reference';
import SchemaElement from './elements/Schema';
import SecurityRequirementElement from './elements/SecurityRequirement';
import ServerElement from './elements/Server';
import ServerBindingsElement from './elements/ServerBindings';
import ServersElement from './elements/Servers';
import ServerVariableElement from './elements/ServerVariable';

export const isAsyncApi2Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AsyncApi2Element =>
      element instanceof AsyncApi2Element ||
      (hasBasicElementProps(element) &&
        isElementType('asyncApi2', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element));
  },
);

export const isAsyncApiVersionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is AsyncApiVersionElement =>
      element instanceof AsyncApiVersionElement ||
      (hasBasicElementProps(element) &&
        isElementType('asyncApiVersion', element) &&
        primitiveEq('string', element));
  },
);

export const isChannelBindingsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ChannelBindingsElement =>
      element instanceof ChannelBindingsElement ||
      (hasBasicElementProps(element) &&
        isElementType('channelBindings', element) &&
        primitiveEq('object', element));
  },
);

export const isChannelItemElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ChannelItemElement =>
      element instanceof ChannelItemElement ||
      (hasBasicElementProps(element) &&
        isElementType('channelItem', element) &&
        primitiveEq('object', element));
  },
);

export const isChannelsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ChannelsElement =>
      element instanceof ChannelsElement ||
      (hasBasicElementProps(element) &&
        isElementType('channels', element) &&
        primitiveEq('object', element));
  },
);

export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ComponentsElement =>
      element instanceof ComponentsElement ||
      (hasBasicElementProps(element) &&
        isElementType('components', element) &&
        primitiveEq('object', element));
  },
);

export const isContactElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ContactElement =>
      element instanceof ContactElement ||
      (hasBasicElementProps(element) &&
        isElementType('contact', element) &&
        primitiveEq('object', element));
  },
);

export const isIdentifierElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is IdentifierElement =>
      element instanceof IdentifierElement ||
      (hasBasicElementProps(element) &&
        isElementType('identifier', element) &&
        primitiveEq('string', element));
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is InfoElement =>
      element instanceof InfoElement ||
      (hasBasicElementProps(element) &&
        isElementType('info', element) &&
        primitiveEq('object', element));
  },
);

export const isLicenseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is LicenseElement =>
      element instanceof LicenseElement ||
      (hasBasicElementProps(element) &&
        isElementType('license', element) &&
        primitiveEq('object', element));
  },
);

export const isOperationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is OperationElement =>
      element instanceof OperationElement ||
      (hasBasicElementProps(element) &&
        isElementType('operation', element) &&
        primitiveEq('object', element));
  },
);

export const isParameterElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParameterElement =>
      element instanceof ParameterElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameter', element) &&
        primitiveEq('object', element));
  },
);

export const isParametersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParametersElement =>
      element instanceof ParametersElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameters', element) &&
        primitiveEq('object', element));
  },
);

export const isReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ReferenceElement =>
      element instanceof ReferenceElement ||
      (hasBasicElementProps(element) &&
        isElementType('reference', element) &&
        primitiveEq('object', element));
  },
);

export const isSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SchemaElement =>
      element instanceof SchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('schema', element) &&
        primitiveEq('object', element));
  },
);

export const isBooleanJsonSchemaElement: ElementPredicate<BooleanElement> = (
  element: unknown,
): element is BooleanElement => {
  return isBooleanElement(element) && element.classes.includes('boolean-json-schema');
};

export const isSecurityRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SecurityRequirementElement =>
      element instanceof SecurityRequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityRequirement', element) &&
        primitiveEq('object', element));
  },
);

export const isServerElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerElement =>
      element instanceof ServerElement ||
      (hasBasicElementProps(element) &&
        isElementType('server', element) &&
        primitiveEq('object', element));
  },
);

export const isServerBindingsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerBindingsElement =>
      element instanceof ServerBindingsElement ||
      (hasBasicElementProps(element) &&
        isElementType('serverBindings', element) &&
        primitiveEq('object', element));
  },
);

export const isServersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServersElement =>
      element instanceof ServersElement ||
      (hasBasicElementProps(element) &&
        isElementType('servers', element) &&
        primitiveEq('object', element));
  },
);

export const isServerVariableElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerVariableElement =>
      element instanceof ServerVariableElement ||
      (hasBasicElementProps(element) &&
        isElementType('serverVariable', element) &&
        primitiveEq('object', element));
  },
);
