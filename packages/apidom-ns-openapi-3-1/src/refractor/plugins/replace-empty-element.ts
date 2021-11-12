import {
  MemberElement,
  ArrayElement,
  isStringElement,
  includesClasses,
} from '@swagger-api/apidom-core';

/**
 * OpenAPI 3.1.0 specification elements.
 */
import InfoElement from '../../elements/Info';
import ContactElement from '../../elements/Contact';
import LicenseElement from '../../elements/License';
import PathsElement from '../../elements/Paths';
import PathItemElement from '../../elements/PathItem';
import ComponentsElement from '../../elements/Components';
import ExternalDocumentationElement from '../../elements/ExternalDocumentation';
import OperationElement from '../../elements/Operation';
import SchemaElement from '../../elements/Schema';
// non-concrete Elements (NCEs)
import WebhooksElement from '../../elements/nces/Webhooks';
import ServerVariablesElement from '../../elements/nces/ServerVariables';
import ComponentsSchemasElement from '../../elements/nces/ComponentsSchemas';
import ComponentsResponsesElement from '../../elements/nces/ComponentsResponses';
import ComponentsParametersElement from '../../elements/nces/ComponentsParameters';
import ComponentsExamplesElement from '../../elements/nces/ComponentsExamples';
import ComponentsRequestBodiesElement from '../../elements/nces/ComponentsRequestBodies';
import ComponentsHeadersElement from '../../elements/nces/ComponentsHeaders';
import ComponentsSecuritySchemesElement from '../../elements/nces/ComponentsSecuritySchemes';
import ComponentsLinksElement from '../../elements/nces/ComponentsLinks';
import ComponentsCallbacksElement from '../../elements/nces/ComponentsCallbacks';
import ComponentsPathItemsElement from '../../elements/nces/ComponentsPathItems';
import PathItemServersElement from '../../elements/nces/PathItemServers';
import PathItemParametersElement from '../../elements/nces/PathItemParameters';
import { getNodeType } from '../../traversal/visitor';

/**
 * This plugin is specific to YAML 1.2 format, which allows defining key-value pairs
 * with empty key, empty value, or both. If the value is not provided in YAML format,
 * this plugin compensates for this missing value with the most appropriate semantic element type.
 *
 * https://yaml.org/spec/1.2.2/#72-empty-nodes
 *
 * @example
 *
 * ```yaml
 * openapi: 3.1.0
 * info:
 * ```
 * Refracting result without this plugin:
 *
 *  (OpenApi3_1Element
 *    (MemberElement
 *      (StringElement)
 *      (OpenapiElement))
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *
 * Refracting result with this plugin:
 *
 *  (OpenApi3_1Element
 *    (MemberElement
 *      (StringElement)
 *      (OpenapiElement))
 *    (MemberElement
 *      (StringElement)
 *      (InfoElement))
 */

const isEmptyElement = (element: any) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  // concrete types handling (CTs)
  OpenApi3_1Element: {
    info: () => new InfoElement(),
    servers: () => new ArrayElement(),
    paths: () => new PathsElement(),
    webhooks: () => new WebhooksElement(),
    components: () => new ComponentsElement(),
    security: () => new ArrayElement(),
    tags: () => new ArrayElement(),
    externalDocs: () => new ExternalDocumentationElement(),
  },
  InfoElement: {
    contact: () => new ContactElement(),
    license: () => new LicenseElement(),
  },
  ServerElement: {
    variables: () => new ServerVariablesElement(),
  },
  ServerVariableElement: {
    enum: () => new ArrayElement(),
  },
  PathsElement: {
    '*': () => new PathItemElement(),
  },
  PathItemElement: {
    get: () => new OperationElement(),
    put: () => new OperationElement(),
    post: () => new OperationElement(),
    delete: () => new OperationElement(),
    options: () => new OperationElement(),
    head: () => new OperationElement(),
    patch: () => new OperationElement(),
    trace: () => new OperationElement(),
    servers: () => new PathItemServersElement(),
    parameters: () => new PathItemParametersElement(),
  },
  ParameterElement: {
    schema: () => new SchemaElement(),
  },
  ComponentsElement: {
    schemas: () => new ComponentsSchemasElement(),
    responses: () => new ComponentsResponsesElement(),
    parameters: () => new ComponentsParametersElement(),
    examples: () => new ComponentsExamplesElement(),
    requestBodies: () => new ComponentsRequestBodiesElement(),
    headers: () => new ComponentsHeadersElement(),
    securitySchemes: () => new ComponentsSecuritySchemesElement(),
    links: () => new ComponentsLinksElement(),
    callbacks: () => new ComponentsCallbacksElement(),
    pathItems: () => new ComponentsPathItemsElement(),
  },
  SecurityRequirementElement: {
    '*': () => new ArrayElement(),
  },
  TagElement: {
    externalDocs: () => new ExternalDocumentationElement(),
  },
  // non-concrete types handling (NCEs)
  [WebhooksElement.primaryClass]: {
    '*': () => new PathItemElement(),
  },
};

const findElementFactory = (ancestor: any, element: MemberElement) => {
  const elementType = getNodeType(ancestor); // @ts-ignore
  const keyName = element.key.toValue(); // @ts-ignore
  const keyMapping = schema[elementType] || schema[ancestor.classes.first?.toValue?.()];

  return typeof keyMapping === 'undefined'
    ? undefined
    : Object.prototype.hasOwnProperty.call(keyMapping, '*')
    ? keyMapping['*']
    : keyMapping[keyName];
};

const plugin = () => () => {
  return {
    visitor: {
      MemberElement(element: MemberElement, ...rest: any) {
        // no empty Element, continue with next one
        if (!isEmptyElement(element.value)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1];
        const elementFactory = findElementFactory(ancestor, element);

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        return new MemberElement(
          element.key,
          elementFactory(),
          element.meta.clone(),
          element.attributes.clone(),
        );
      },
    },
  };
};

export default plugin;
