import { BooleanElement, createPredicate, isBooleanElement } from '@swagger-api/apidom-core';
import type { ElementPredicate } from '@swagger-api/apidom-core';

import CallbackElement from './elements/Callback.ts';
import ComponentsElement from './elements/Components.ts';
import ContactElement from './elements/Contact.ts';
import ExampleElement from './elements/Example.ts';
import ExternalDocumentationElement from './elements/ExternalDocumentation.ts';
import HeaderElement from './elements/Header.ts';
import InfoElement from './elements/Info.ts';
import LicenseElement from './elements/License.ts';
import LinkElement from './elements/Link.ts';
import OpenapiElement from './elements/Openapi.ts';
import OpenApi3_0Element from './elements/OpenApi3-0.ts';
import OperationElement from './elements/Operation.ts';
import ParameterElement from './elements/Parameter.ts';
import PathItemElement from './elements/PathItem.ts';
import PathsElement from './elements/Paths.ts';
import ReferenceElement from './elements/Reference.ts';
import RequestBodyElement from './elements/RequestBody.ts';
import ResponseElement from './elements/Response.ts';
import ResponsesElement from './elements/Responses.ts';
import SchemaElement from './elements/Schema.ts';
import SecurityRequirementElement from './elements/SecurityRequirement.ts';
import SecuritySchemeElement from './elements/SecurityScheme.ts';
import ServerElement from './elements/Server.ts';
import ServerVariableElement from './elements/ServerVariable.ts';
import MediaTypeElement from './elements/MediaType.ts';
import DiscriminatorElement from './elements/Discriminator.ts';
// NCE types
import ServersElement from './elements/nces/Servers.ts';

/**
 * @public
 */
export const isCallbackElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is CallbackElement =>
      element instanceof CallbackElement ||
      (hasBasicElementProps(element) &&
        isElementType('callback', element) &&
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
export const isExampleElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ExampleElement =>
      element instanceof ExampleElement ||
      (hasBasicElementProps(element) &&
        isElementType('example', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isExternalDocumentationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ExternalDocumentationElement =>
      element instanceof ExternalDocumentationElement ||
      (hasBasicElementProps(element) &&
        isElementType('externalDocumentation', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isHeaderElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is HeaderElement =>
      element instanceof HeaderElement ||
      (hasBasicElementProps(element) &&
        isElementType('header', element) &&
        primitiveEq('object', element));
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
export const isLinkElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is LinkElement =>
      element instanceof LinkElement ||
      (hasBasicElementProps(element) &&
        isElementType('link', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isOpenapiElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is OpenapiElement =>
      element instanceof OpenapiElement ||
      (hasBasicElementProps(element) &&
        isElementType('openapi', element) &&
        primitiveEq('string', element));
  },
);

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const isOpenApi3_0Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is OpenApi3_0Element =>
      element instanceof OpenApi3_0Element ||
      (hasBasicElementProps(element) &&
        isElementType('openApi3_0', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element));
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
export const isPathItemElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is PathItemElement =>
      element instanceof PathItemElement ||
      (hasBasicElementProps(element) &&
        isElementType('pathItem', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isPathsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is PathsElement =>
      element instanceof PathsElement ||
      (hasBasicElementProps(element) &&
        isElementType('paths', element) &&
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
export const isRequestBodyElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is RequestBodyElement =>
      element instanceof RequestBodyElement ||
      (hasBasicElementProps(element) &&
        isElementType('requestBody', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isResponseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ResponseElement =>
      element instanceof ResponseElement ||
      (hasBasicElementProps(element) &&
        isElementType('response', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isResponsesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ResponsesElement =>
      element instanceof ResponsesElement ||
      (hasBasicElementProps(element) &&
        isElementType('responses', element) &&
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
export const isSecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SecuritySchemeElement =>
      element instanceof SecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityScheme', element) &&
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
export const isServerVariableElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerVariableElement =>
      element instanceof ServerVariableElement ||
      (hasBasicElementProps(element) &&
        isElementType('serverVariable', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isMediaTypeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is MediaTypeElement =>
      element instanceof MediaTypeElement ||
      (hasBasicElementProps(element) &&
        isElementType('mediaType', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isServersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is ServersElement =>
      element instanceof ServersElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('servers', element));
  },
);

/**
 * @public
 */
export const isDiscriminatorElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is DiscriminatorElement =>
      element instanceof DiscriminatorElement ||
      (hasBasicElementProps(element) &&
        isElementType('discriminator', element) &&
        primitiveEq('object', element));
  },
);
