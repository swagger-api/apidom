import { createPredicate } from '@swagger-api/apidom-core';

import SwaggerElement from './elements/Swagger.ts';
import SwaggerVersionElement from './elements/SwaggerVersion.ts';
import InfoElement from './elements/Info.ts';
import ContactElement from './elements/Contact.ts';
import LicenseElement from './elements/License.ts';
import PathsElement from './elements/Paths.ts';
import PathItemElement from './elements/PathItem.ts';
import OperationElement from './elements/Operation.ts';
import ExternalDocumentationElement from './elements/ExternalDocumentation.ts';
import ParameterElement from './elements/Parameter.ts';
import ItemsElement from './elements/Items.ts';
import ExampleElement from './elements/Example.ts';
import ResponsesElement from './elements/Responses.ts';
import ResponseElement from './elements/Response.ts';
import HeadersElement from './elements/Headers.ts';
import HeaderElement from './elements/Header.ts';
import TagElement from './elements/Tag.ts';
import ReferenceElement from './elements/Reference.ts';
import SchemaElement from './elements/Schema.ts';
import XmlElement from './elements/Xml.ts';
import DefinitionsElement from './elements/Definitions.ts';
import ParametersDefinitionsElement from './elements/ParametersDefinitions.ts';
import ResponsesDefinitionsElement from './elements/ResponsesDefinitions.ts';
import SecurityDefinitionsElement from './elements/SecurityDefinitions.ts';
import SecuritySchemeElement from './elements/SecurityScheme.ts';
import SecurityRequirementElement from './elements/SecurityRequirement.ts';
import ScopesElement from './elements/Scopes.ts';

/**
 * @public
 */
export const isSwaggerElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SwaggerElement =>
      element instanceof SwaggerElement ||
      (hasBasicElementProps(element) &&
        isElementType('swagger', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isSwaggerVersionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SwaggerVersionElement =>
      element instanceof SwaggerVersionElement ||
      (hasBasicElementProps(element) &&
        isElementType('swaggerVersion', element) &&
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
export const isItemsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ItemsElement =>
      element instanceof ItemsElement ||
      (hasBasicElementProps(element) &&
        isElementType('items', element) &&
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
export const isHeadersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is HeadersElement =>
      element instanceof HeadersElement ||
      (hasBasicElementProps(element) &&
        isElementType('headers', element) &&
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
export const isTagElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is TagElement =>
      element instanceof TagElement ||
      (hasBasicElementProps(element) &&
        isElementType('tag', element) &&
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
export const isXmlElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is XmlElement =>
      element instanceof XmlElement ||
      (hasBasicElementProps(element) &&
        isElementType('xml', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isResponsesDefinitionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ResponsesDefinitionsElement =>
      element instanceof ResponsesDefinitionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('responsesDefinitions', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isSecurityDefinitionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SecurityDefinitionsElement =>
      element instanceof SecurityDefinitionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityDefinitions', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isDefinitionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is DefinitionsElement =>
      element instanceof DefinitionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('definitions', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isParametersDefinitionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParametersDefinitionsElement =>
      element instanceof ParametersDefinitionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('parametersDefinitions', element) &&
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
export const isScopesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ScopesElement =>
      element instanceof ScopesElement ||
      (hasBasicElementProps(element) &&
        isElementType('scopes', element) &&
        primitiveEq('object', element));
  },
);

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
