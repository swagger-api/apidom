import { createPredicate } from '@swagger-api/apidom-core';

import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import ContactElement from './elements/Contact';
import ExternalDocumentationElement from './elements/ExternalDocumentation';
import ParameterElement from './elements/Parameter';
import ItemsElement from './elements/Items';
import ExampleElement from './elements/Example';
import HeadersElement from './elements/Headers';
import HeaderElement from './elements/Header';
import TagElement from './elements/Tag';
import ReferenceElement from './elements/Reference';
import SchemaElement from './elements/Schema';
import XmlElement from './elements/Xml';
import SecurityDefinitionsElement from './elements/SecurityDefinitions';
import SecuritySchemeElement from './elements/SecurityScheme';
import SecurityRequirementElement from './elements/SecurityRequirement';
import ScopesElement from './elements/Scopes';

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

export const isContactElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ContactElement =>
      element instanceof ContactElement ||
      (hasBasicElementProps(element) &&
        isElementType('contact', element) &&
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

export const isParameterElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParameterElement =>
      element instanceof ParameterElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameter', element) &&
        primitiveEq('object', element));
  },
);

export const isItemsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ItemsElement =>
      element instanceof ItemsElement ||
      (hasBasicElementProps(element) &&
        isElementType('items', element) &&
        primitiveEq('object', element));
  },
);

export const isHeadersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is HeadersElement =>
      element instanceof HeadersElement ||
      (hasBasicElementProps(element) &&
        isElementType('headers', element) &&
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

export const isHeaderElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is HeaderElement =>
      element instanceof HeaderElement ||
      (hasBasicElementProps(element) &&
        isElementType('header', element) &&
        primitiveEq('object', element));
  },
);

export const isTagElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is TagElement =>
      element instanceof TagElement ||
      (hasBasicElementProps(element) &&
        isElementType('tag', element) &&
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

export const isXmlElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is XmlElement =>
      element instanceof XmlElement ||
      (hasBasicElementProps(element) &&
        isElementType('xml', element) &&
        primitiveEq('object', element));
  },
);

export const isSecurityDefinitionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SecurityDefinitionsElement =>
      element instanceof SecurityDefinitionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityDefinitions', element) &&
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

export const isScopesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ScopesElement =>
      element instanceof ScopesElement ||
      (hasBasicElementProps(element) &&
        isElementType('scopes', element) &&
        primitiveEq('object', element));
  },
);

export const isSecurityRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SecurityRequirementElement =>
      element instanceof SecurityRequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityRequirement', element) &&
        primitiveEq('object', element));
  },
);
