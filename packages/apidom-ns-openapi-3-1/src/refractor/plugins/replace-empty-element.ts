import {
  MemberElement,
  ArrayElement,
  ObjectElement,
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
import RequestBodyElement from '../../elements/RequestBody';
import ResponsesElement from '../../elements/Responses';
import ResponseElement from '../../elements/Response';
import ServerElement from '../../elements/Server';
import DiscriminatorElement from '../../elements/Discriminator';
import XmlElement from '../../elements/Xml';
import OAuthFlowsElement from '../../elements/OAuthFlows';
import OAuthFlowElement from '../../elements/OAuthFlow';
import ServerVariableElement from '../../elements/ServerVariable';
import ParameterElement from '../../elements/Parameter';
import ExampleElement from '../../elements/Example';
import HeaderElement from '../../elements/Header';
import SecuritySchemeElement from '../../elements/SecurityScheme';
import LinkElement from '../../elements/Link';
import CallbackElement from '../../elements/Callback';
import MediaTypeElement from '../../elements/MediaType';
import EncodingElement from '../../elements/Encoding';
// non-concrete Elements (NCEs)
import ServersElement from '../../elements/nces/Servers';
import SecurityElement from '../../elements/nces/Security';
import TagsElement from '../../elements/nces/Tags';
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
import OperationParametersElement from '../../elements/nces/OperationParameters';
import ParameterExamplesElement from '../../elements/nces/ParameterExamples';
import ParameterContentElement from '../../elements/nces/ParameterContent';
import OperationTagsElement from '../../elements/nces/OperationTags';
import OperationCallbacksElement from '../../elements/nces/OperationCallbacks';
import OperationSecurityElement from '../../elements/nces/OperationSecurity';
import OperationServersElement from '../../elements/nces/OperationServers';
import RequestBodyContentElement from '../../elements/nces/RequestBodyContent';
import MediaTypeExamplesElement from '../../elements/nces/MediaTypeExamples';
import MediaTypeEncodingElement from '../../elements/nces/MediaTypeEncoding';
import EncodingHeadersElement from '../../elements/nces/EncodingHeaders';
import ResponseHeadersElement from '../../elements/nces/ResponseHeaders';
import ResponseContentElement from '../../elements/nces/ResponseContent';
import ResponseLinksElement from '../../elements/nces/ResponseLinks';
import DiscriminatorMappingElement from '../../elements/nces/DiscriminatorMapping';
import OAuthFlowScopesElement from '../../elements/nces/OAuthFlowScopes';
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
    servers: () => new ServersElement(),
    paths: () => new PathsElement(),
    webhooks: () => new WebhooksElement(),
    components: () => new ComponentsElement(),
    security: () => new SecurityElement(),
    tags: () => new TagsElement(),
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
  OperationElement: {
    tags: () => new OperationTagsElement(),
    externalDocs: () => new ExternalDocumentationElement(),
    parameters: () => new OperationParametersElement(),
    requestBody: () => new RequestBodyElement(),
    responses: () => new ResponsesElement(),
    callbacks: () => new OperationCallbacksElement(),
    security: () => new OperationSecurityElement(),
    servers: () => new OperationServersElement(),
  },
  ParameterElement: {
    schema: () => new SchemaElement(),
    examples: () => new ParameterExamplesElement(),
    content: () => new ParameterContentElement(),
  },
  RequestBodyElement: {
    content: () => new RequestBodyContentElement(),
  },
  MediaTypeElement: {
    schema: () => new SchemaElement(),
    examples: () => new MediaTypeExamplesElement(),
    encoding: () => new MediaTypeEncodingElement(),
  },
  EncodingElement: {
    headers: () => new EncodingHeadersElement(),
  },
  ResponsesElement: {
    '*': () => new ResponseElement(),
  },
  ResponseElement: {
    headers: () => new ResponseHeadersElement(),
    content: () => new ResponseContentElement(),
    links: () => new ResponseLinksElement(),
  },
  CallbackElement: {
    '*': () => new PathItemElement(),
  },
  LinkElement: {
    server: () => new ServerElement(),
  },
  HeaderElement: {
    schema: () => new SchemaElement(),
    examples: () => new ParameterExamplesElement(),
    content: () => new ParameterContentElement(),
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
  SchemaElement: {
    $vocabulary: () => new ObjectElement({}, { classes: ['json-schema-$vocabulary'] }),
    $defs: () => new ObjectElement({ classes: ['json-schema-$defs'] }),
    allOf: () => new ArrayElement([], { classes: ['json-schema-allOf'] }),
    anyOf: () => new ArrayElement([], { classes: ['json-schema-anyOf'] }),
    oneOf: () => new ArrayElement([], { classes: ['json-schema-oneOf'] }),
    not: () => new SchemaElement(),
    if: () => new SchemaElement(),
    then: () => new SchemaElement(),
    else: () => new SchemaElement(),
    dependentSchemas: () => new ObjectElement({}, { classes: ['json-schema-dependentSchemas'] }),
    prefixItems: () => new ArrayElement([], { classes: ['json-schema-prefixItems'] }),
    items: () => new SchemaElement(),
    contains: () => new SchemaElement(),
    properties: () => new ObjectElement({}, { classes: ['json-schema-properties'] }),
    patternProperties: () => new ObjectElement({}, { classes: ['json-schema-patternProperties'] }),
    additionalProperties: () => new SchemaElement(),
    propertyNames: () => new SchemaElement(),
    unevaluatedItems: () => new SchemaElement(),
    unevaluatedProperties: () => new SchemaElement(),
    type: () => new ArrayElement([], { classes: ['json-schema-type'] }),
    enum: () => new ArrayElement([], { classes: ['json-schema-enum'] }),
    required: () => new ArrayElement([], { classes: ['json-schema-required'] }),
    dependentRequired: () => new ObjectElement({}, { classes: ['json-schema-dependentRequired'] }),
    examples: () => new ArrayElement([], { classes: ['json-schema-examples'] }),
    contentSchema: () => new SchemaElement(),
    discriminator: () => new DiscriminatorElement(),
    xml: () => new XmlElement(),
    externalDocs: () => new ExternalDocumentationElement(),
  },
  DiscriminatorElement: {
    mapping: () => new DiscriminatorMappingElement(),
  },
  SecuritySchemeElement: {
    flows: () => new OAuthFlowsElement(),
  },
  OAuthFlowsElement: {
    implicit: () => new OAuthFlowElement(),
    password: () => new OAuthFlowElement(),
    clientCredentials: () => new OAuthFlowElement(),
    authorizationCode: () => new OAuthFlowElement(),
  },
  OAuthFlowElement: {
    scopes: () => new OAuthFlowScopesElement(),
  },
  // non-concrete types handling (NCEs)
  [WebhooksElement.primaryClass]: {
    '*': () => new PathItemElement(),
  },
  [ServerVariablesElement.primaryClass]: {
    '*': () => new ServerVariableElement(),
  },
  [ComponentsSchemasElement.primaryClass]: {
    '*': () => new SchemaElement(),
  },
  [ComponentsResponsesElement.primaryClass]: {
    '*': () => new ResponseElement(),
  },
  [ComponentsParametersElement.primaryClass]: {
    '*': () => new ParameterElement(),
  },
  [ComponentsExamplesElement.primaryClass]: {
    '*': () => new ExampleElement(),
  },
  [ComponentsRequestBodiesElement.primaryClass]: {
    '*': () => new RequestBodyElement(),
  },
  [ComponentsHeadersElement.primaryClass]: {
    '*': () => new HeaderElement(),
  },
  [ComponentsSecuritySchemesElement.primaryClass]: {
    '*': () => new SecuritySchemeElement(),
  },
  [ComponentsLinksElement.primaryClass]: {
    '*': () => new LinkElement(),
  },
  [ComponentsCallbacksElement.primaryClass]: {
    '*': () => new CallbackElement(),
  },
  [ComponentsPathItemsElement.primaryClass]: {
    '*': () => new PathItemElement(),
  },
  [OperationCallbacksElement.primaryClass]: {
    '*': () => new CallbackElement(),
  },
  [ParameterExamplesElement.primaryClass]: {
    '*': () => new ExampleElement(),
  },
  [ParameterContentElement.primaryClass]: {
    '*': () => new MediaTypeElement(),
  },
  [RequestBodyContentElement.primaryClass]: {
    '*': () => new MediaTypeElement(),
  },
  [MediaTypeExamplesElement.primaryClass]: {
    '*': () => new ExampleElement(),
  },
  [MediaTypeEncodingElement.primaryClass]: {
    '*': () => new EncodingElement(),
  },
  [EncodingHeadersElement.primaryClass]: {
    '*': () => new HeaderElement(),
  },
  [ResponseHeadersElement.primaryClass]: {
    '*': () => new HeaderElement(),
  },
  [ResponseContentElement.primaryClass]: {
    '*': () => new MediaTypeElement(),
  },
  [ResponseLinksElement.primaryClass]: {
    '*': () => new LinkElement(),
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
