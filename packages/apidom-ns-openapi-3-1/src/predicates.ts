import { createPredicate, isBooleanElement, isStringElement } from '@swagger-api/apidom-core';

import CallbackElement from './elements/Callback';
import ComponentsElement from './elements/Components';
import HeaderElement from './elements/Header';
import InfoElement from './elements/Info';
import JsonSchemaDialectElement from './elements/JsonSchemaDialect';
import LicenseElement from './elements/License';
import OpenapiElement from './elements/Openapi';
import OpenApi3_1Element from './elements/OpenApi3-1';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import PathItemElement from './elements/PathItem';
import ReferenceElement from './elements/Reference';
import ResponseElement from './elements/Response';
import ResponsesElement from './elements/Responses';
import SchemaElement from './elements/Schema';
import MediaTypeElement from './elements/MediaType';

export const isCallbackElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof CallbackElement ||
      (hasBasicElementProps(element) &&
        isElementType('callback', element) &&
        primitiveEq('object', element));
  },
);

export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ComponentsElement ||
      (hasBasicElementProps(element) &&
        isElementType('components', element) &&
        primitiveEq('object', element));
  },
);

export const isHeaderElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof HeaderElement ||
      (hasBasicElementProps(element) &&
        isElementType('header', element) &&
        primitiveEq('object', element));
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof InfoElement ||
      (hasBasicElementProps(element) &&
        isElementType('info', element) &&
        primitiveEq('object', element));
  },
);

export const isJsonSchemaDialectElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof JsonSchemaDialectElement ||
      (hasBasicElementProps(element) &&
        isElementType('jsonSchemaDialect', element) &&
        primitiveEq('string', element));
  },
);

export const isLicenseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof LicenseElement ||
      (hasBasicElementProps(element) &&
        isElementType('license', element) &&
        primitiveEq('object', element));
  },
);

export const isOpenapiElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof OpenapiElement ||
      (hasBasicElementProps(element) &&
        isElementType('openapi', element) &&
        primitiveEq('string', element));
  },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const isOpenApi3_1Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: any) =>
      element instanceof OpenApi3_1Element ||
      (hasBasicElementProps(element) &&
        isElementType('openApi3_1', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element));
  },
);

export const isOperationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof OperationElement ||
      (hasBasicElementProps(element) &&
        isElementType('operation', element) &&
        primitiveEq('object', element));
  },
);

export const isParameterElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ParameterElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameter', element) &&
        primitiveEq('object', element));
  },
);

export const isPathItemElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof PathItemElement ||
      (hasBasicElementProps(element) &&
        isElementType('pathItem', element) &&
        primitiveEq('object', element));
  },
);

export const isPathItemElementExternal = (element: any): element is PathItemElement => {
  if (!isPathItemElement(element)) {
    return false;
  }
  if (!isStringElement(element.$ref)) {
    return false;
  }

  const value = element.$ref.toValue();

  return typeof value === 'string' && value.length > 0 && !value.startsWith('#');
};

export const isReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ReferenceElement ||
      (hasBasicElementProps(element) &&
        isElementType('reference', element) &&
        primitiveEq('object', element));
  },
);

export const isReferenceElementExternal = (element: any): element is ReferenceElement => {
  if (!isReferenceElement(element)) {
    return false;
  }
  if (!isStringElement(element.$ref)) {
    return false;
  }

  const value = element.$ref.toValue();

  return typeof value === 'string' && value.length > 0 && !value.startsWith('#');
};

export const isResponseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ResponseElement ||
      (hasBasicElementProps(element) &&
        isElementType('response', element) &&
        primitiveEq('object', element));
  },
);

export const isResponsesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ResponsesElement ||
      (hasBasicElementProps(element) &&
        isElementType('responses', element) &&
        primitiveEq('object', element));
  },
);

export const isSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof SchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('schema', element) &&
        primitiveEq('object', element));
  },
);

export const isBooleanJsonSchemaElement = (element: any) => {
  return isBooleanElement(element) && element.classes.includes('boolean-json-schema');
};

export const isMediaTypeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof MediaTypeElement ||
      (hasBasicElementProps(element) &&
        isElementType('mediaType', element) &&
        primitiveEq('object', element));
  },
);
