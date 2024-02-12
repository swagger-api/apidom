import {
  BooleanElement,
  createPredicate,
  isBooleanElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import type { ElementPredicate } from '@swagger-api/apidom-core';

import CallbackElement from './elements/Callback';
import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import ExampleElement from './elements/Example';
import ExternalDocumentationElement from './elements/ExternalDocumentation';
import HeaderElement from './elements/Header';
import InfoElement from './elements/Info';
import JsonSchemaDialectElement from './elements/JsonSchemaDialect';
import LicenseElement from './elements/License';
import LinkElement from './elements/Link';
import OpenapiElement from './elements/Openapi';
import OpenApi3_1Element from './elements/OpenApi3-1';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import PathItemElement from './elements/PathItem';
import PathsElement from './elements/Paths';
import ReferenceElement from './elements/Reference';
import RequestBodyElement from './elements/RequestBody';
import ResponseElement from './elements/Response';
import ResponsesElement from './elements/Responses';
import SchemaElement from './elements/Schema';
import SecurityRequirementElement from './elements/SecurityRequirement';
import SecuritySchemeElement from './elements/SecurityScheme';
import ServerElement from './elements/Server';
import ServerVariableElement from './elements/ServerVariable';
import MediaTypeElement from './elements/MediaType';

export const isCallbackElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is CallbackElement =>
      element instanceof CallbackElement ||
      (hasBasicElementProps(element) &&
        isElementType('callback', element) &&
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

export const isExampleElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ExampleElement =>
      element instanceof ExampleElement ||
      (hasBasicElementProps(element) &&
        isElementType('example', element) &&
        primitiveEq('object', element));
  },
);

export const isExternalDocumentationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ExternalDocumentationElement =>
      element instanceof ExternalDocumentationElement ||
      (hasBasicElementProps(element) &&
        isElementType('externalDocumentation', element) &&
        primitiveEq('object', element));
  },
);

export const isHeaderElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is HeaderElement =>
      element instanceof HeaderElement ||
      (hasBasicElementProps(element) &&
        isElementType('header', element) &&
        primitiveEq('object', element));
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

export const isJsonSchemaDialectElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is JsonSchemaDialectElement =>
      element instanceof JsonSchemaDialectElement ||
      (hasBasicElementProps(element) &&
        isElementType('jsonSchemaDialect', element) &&
        primitiveEq('string', element));
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

export const isLinkElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is LinkElement =>
      element instanceof LinkElement ||
      (hasBasicElementProps(element) &&
        isElementType('link', element) &&
        primitiveEq('object', element));
  },
);

export const isOpenapiElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is OpenapiElement =>
      element instanceof OpenapiElement ||
      (hasBasicElementProps(element) &&
        isElementType('openapi', element) &&
        primitiveEq('string', element));
  },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const isOpenApi3_1Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is OpenApi3_1Element =>
      element instanceof OpenApi3_1Element ||
      (hasBasicElementProps(element) &&
        isElementType('openApi3_1', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element));
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
 * @deprecated
 * Determining whether a PathItemElement is external or internal is not possible by just looking
 * at value of the $ref fixed field. The value of the $ref field needs to be resolved in runtime
 * using the referring document as the Base URI.
 */
export const isPathItemElementExternal: ElementPredicate<PathItemElement> = (
  element: unknown,
): element is PathItemElement => {
  if (!isPathItemElement(element)) {
    return false;
  }
  if (!isStringElement(element.$ref)) {
    return false;
  }

  const value = toValue(element.$ref);

  return typeof value === 'string' && value.length > 0 && !value.startsWith('#');
};

export const isPathsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is PathsElement =>
      element instanceof PathsElement ||
      (hasBasicElementProps(element) &&
        isElementType('paths', element) &&
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

/**
 * @deprecated
 * Determining whether a ReferenceElement is external or internal is not possible by just looking
 * at value of the $ref fixed field. The value of the $ref field needs to be resolved in runtime
 * using the referring document as the Base URI.
 */
export const isReferenceElementExternal: ElementPredicate<ReferenceElement> = (
  element: unknown,
): element is ReferenceElement => {
  if (!isReferenceElement(element)) {
    return false;
  }
  if (!isStringElement(element.$ref)) {
    return false;
  }

  const value = toValue(element.$ref);

  return typeof value === 'string' && value.length > 0 && !value.startsWith('#');
};

export const isRequestBodyElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is RequestBodyElement =>
      element instanceof RequestBodyElement ||
      (hasBasicElementProps(element) &&
        isElementType('requestBody', element) &&
        primitiveEq('object', element));
  },
);

export const isResponseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ResponseElement =>
      element instanceof ResponseElement ||
      (hasBasicElementProps(element) &&
        isElementType('response', element) &&
        primitiveEq('object', element));
  },
);

export const isResponsesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ResponsesElement =>
      element instanceof ResponsesElement ||
      (hasBasicElementProps(element) &&
        isElementType('responses', element) &&
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

export const isSecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SecuritySchemeElement =>
      element instanceof SecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityScheme', element) &&
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

export const isServerVariableElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ServerVariableElement =>
      element instanceof ServerVariableElement ||
      (hasBasicElementProps(element) &&
        isElementType('serverVariable', element) &&
        primitiveEq('object', element));
  },
);

export const isMediaTypeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is MediaTypeElement =>
      element instanceof MediaTypeElement ||
      (hasBasicElementProps(element) &&
        isElementType('mediaType', element) &&
        primitiveEq('object', element));
  },
);
