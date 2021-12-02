import {
  MemberElement,
  ArrayElement,
  ObjectElement,
  StringElement,
  isStringElement,
  includesClasses,
  isArrayElement,
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
import SecurityRequirementElement from '../../elements/SecurityRequirement';
import TagElement from '../../elements/Tag';
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
    info: (...args: any[]) => new InfoElement(...args),
    servers: (...args: any[]) => new ServersElement(...args),
    paths: (...args: any[]) => new PathsElement(...args),
    webhooks: (...args: any[]) => new WebhooksElement(...args),
    components: (...args: any[]) => new ComponentsElement(...args),
    security: (...args: any[]) => new SecurityElement(...args),
    tags: (...args: any[]) => new TagsElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
  },
  InfoElement: {
    contact: (...args: any[]) => new ContactElement(...args),
    license: (...args: any[]) => new LicenseElement(...args),
  },
  ServerElement: {
    variables: (...args: any[]) => new ServerVariablesElement(...args),
  },
  ServerVariableElement: {
    enum: (...args: any[]) => new ArrayElement(...args),
  },
  PathsElement: {
    '[keyName: *]': (...args: any[]) => new PathItemElement(...args),
  },
  PathItemElement: {
    get: (...args: any[]) => new OperationElement(...args),
    put: (...args: any[]) => new OperationElement(...args),
    post: (...args: any[]) => new OperationElement(...args),
    delete: (...args: any[]) => new OperationElement(...args),
    options: (...args: any[]) => new OperationElement(...args),
    head: (...args: any[]) => new OperationElement(...args),
    patch: (...args: any[]) => new OperationElement(...args),
    trace: (...args: any[]) => new OperationElement(...args),
    servers: (...args: any[]) => new PathItemServersElement(...args),
    parameters: (...args: any[]) => new PathItemParametersElement(...args),
  },
  OperationElement: {
    tags: (...args: any[]) => new OperationTagsElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
    parameters: (...args: any[]) => new OperationParametersElement(...args),
    requestBody: (...args: any[]) => new RequestBodyElement(...args),
    responses: (...args: any[]) => new ResponsesElement(...args),
    callbacks: (...args: any[]) => new OperationCallbacksElement(...args),
    security: (...args: any[]) => new OperationSecurityElement(...args),
    servers: (...args: any[]) => new OperationServersElement(...args),
  },
  ParameterElement: {
    schema: (...args: any[]) => new SchemaElement(...args),
    examples: (...args: any[]) => new ParameterExamplesElement(...args),
    content: (...args: any[]) => new ParameterContentElement(...args),
  },
  RequestBodyElement: {
    content: (...args: any[]) => new RequestBodyContentElement(...args),
  },
  MediaTypeElement: {
    schema: (...args: any[]) => new SchemaElement(...args),
    examples: (...args: any[]) => new MediaTypeExamplesElement(...args),
    encoding: (...args: any[]) => new MediaTypeEncodingElement(...args),
  },
  EncodingElement: {
    headers: (...args: any[]) => new EncodingHeadersElement(...args),
  },
  ResponsesElement: {
    '[key: *]': (...args: any[]) => new ResponseElement(...args),
  },
  ResponseElement: {
    headers: (...args: any[]) => new ResponseHeadersElement(...args),
    content: (...args: any[]) => new ResponseContentElement(...args),
    links: (...args: any[]) => new ResponseLinksElement(...args),
  },
  CallbackElement: {
    '[key: *]': (...args: any[]) => new PathItemElement(...args),
  },
  LinkElement: {
    server: (...args: any[]) => new ServerElement(...args),
  },
  HeaderElement: {
    schema: (...args: any[]) => new SchemaElement(...args),
    examples: (...args: any[]) => new ParameterExamplesElement(...args),
    content: (...args: any[]) => new ParameterContentElement(...args),
  },
  ComponentsElement: {
    schemas: (...args: any[]) => new ComponentsSchemasElement(...args),
    responses: (...args: any[]) => new ComponentsResponsesElement(...args),
    parameters: (...args: any[]) => new ComponentsParametersElement(...args),
    examples: (...args: any[]) => new ComponentsExamplesElement(...args),
    requestBodies: (...args: any[]) => new ComponentsRequestBodiesElement(...args),
    headers: (...args: any[]) => new ComponentsHeadersElement(...args),
    securitySchemes: (...args: any[]) => new ComponentsSecuritySchemesElement(...args),
    links: (...args: any[]) => new ComponentsLinksElement(...args),
    callbacks: (...args: any[]) => new ComponentsCallbacksElement(...args),
    pathItems: (...args: any[]) => new ComponentsPathItemsElement(...args),
  },
  SecurityRequirementElement: {
    '[key: *]': (...args: any[]) => new ArrayElement(...args),
  },
  TagElement: {
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
  },
  SchemaElement: {
    $vocabulary: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-$vocabulary');
      return element;
    },
    $defs: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-$defs');
      return element;
    },
    allOf: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-allOf');
      return element;
    },
    anyOf: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-anyOf');
      return element;
    },
    oneOf: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-oneOf');
      return element;
    },
    not: (...args: any[]) => new SchemaElement(...args),
    if: (...args: any[]) => new SchemaElement(...args),
    then: (...args: any[]) => new SchemaElement(...args),
    else: (...args: any[]) => new SchemaElement(...args),
    dependentSchemas: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-dependentSchemas');
      return element;
    },
    prefixItems: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-prefixItems');
      return element;
    },
    items: (...args: any[]) => new SchemaElement(...args),
    contains: (...args: any[]) => new SchemaElement(...args),
    properties: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-properties');
      return element;
    },
    patternProperties: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-patternProperties');
      return element;
    },
    additionalProperties: (...args: any[]) => new SchemaElement(...args),
    propertyNames: (...args: any[]) => new SchemaElement(...args),
    unevaluatedItems: (...args: any[]) => new SchemaElement(...args),
    unevaluatedProperties: (...args: any[]) => new SchemaElement(...args),
    type: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-type');
      return element;
    },
    enum: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-enum');
      return element;
    },
    required: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-required');
      return element;
    },
    dependentRequired: (...args: any[]) => {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-dependentRequired');
      return element;
    },
    examples: (...args: any[]) => {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-examples');
      return element;
    },
    contentSchema: (...args: any[]) => new SchemaElement(...args),
    discriminator: (...args: any[]) => new DiscriminatorElement(...args),
    xml: (...args: any[]) => new XmlElement(...args),
    externalDocs: (...args: any[]) => new ExternalDocumentationElement(...args),
  },
  DiscriminatorElement: {
    mapping: (...args: any[]) => new DiscriminatorMappingElement(...args),
  },
  SecuritySchemeElement: {
    flows: (...args: any[]) => new OAuthFlowsElement(...args),
  },
  OAuthFlowsElement: {
    implicit: (...args: any[]) => new OAuthFlowElement(...args),
    password: (...args: any[]) => new OAuthFlowElement(...args),
    clientCredentials: (...args: any[]) => new OAuthFlowElement(...args),
    authorizationCode: (...args: any[]) => new OAuthFlowElement(...args),
  },
  OAuthFlowElement: {
    scopes: (...args: any[]) => new OAuthFlowScopesElement(...args),
  },
  // non-concrete types handling (NCEs)
  [WebhooksElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new PathItemElement(...args),
  },
  [ServerVariablesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ServerVariableElement(...args),
  },
  [ComponentsSchemasElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new SchemaElement(...args),
  },
  [ComponentsResponsesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ResponseElement(...args),
  },
  [ComponentsParametersElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ParameterElement(...args),
  },
  [ComponentsExamplesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ExampleElement(...args),
  },
  [ComponentsRequestBodiesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new RequestBodyElement(...args),
  },
  [ComponentsHeadersElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new HeaderElement(...args),
  },
  [ComponentsSecuritySchemesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new SecuritySchemeElement(...args),
  },
  [ComponentsLinksElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new LinkElement(...args),
  },
  [ComponentsCallbacksElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new CallbackElement(...args),
  },
  [ComponentsPathItemsElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new PathItemElement(...args),
  },
  [OperationCallbacksElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new CallbackElement(...args),
  },
  [ParameterExamplesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ExampleElement(...args),
  },
  [ParameterContentElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new MediaTypeElement(...args),
  },
  [RequestBodyContentElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new MediaTypeElement(...args),
  },
  [MediaTypeExamplesElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new ExampleElement(...args),
  },
  [MediaTypeEncodingElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new EncodingElement(...args),
  },
  [EncodingHeadersElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new HeaderElement(...args),
  },
  [ResponseHeadersElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new HeaderElement(...args),
  },
  [ResponseContentElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new MediaTypeElement(...args),
  },
  [ResponseLinksElement.primaryClass]: {
    '[key: *]': (...args: any[]) => new LinkElement(...args),
  },
  [ServersElement.primaryClass]: {
    '<*>': (...args: any[]) => new ServerElement(...args),
  },
  [SecurityElement.primaryClass]: {
    '<*>': (...args: any[]) => new SecurityRequirementElement(...args),
  },
  [TagsElement.primaryClass]: {
    '<*>': (...args: any[]) => new TagElement(...args),
  },
  [PathItemServersElement.primaryClass]: {
    '<*>': (...args: any[]) => new ServerElement(...args),
  },
  [PathItemParametersElement.primaryClass]: {
    '<*>': (...args: any[]) => new ParameterElement(...args),
  },
  [OperationParametersElement.primaryClass]: {
    '<*>': (...args: any[]) => new ParameterElement(...args),
  },
  [OperationSecurityElement.primaryClass]: {
    '<*>': (...args: any[]) => new SecurityRequirementElement(...args),
  },
  [OperationServersElement.primaryClass]: {
    '<*>': (...args: any[]) => new ServerElement(...args),
  },
  'json-schema-allOf': {
    '<*>': (...args: any[]) => new SchemaElement(...args),
  },
  'json-schema-anyOf': {
    '<*>': (...args: any[]) => new SchemaElement(...args),
  },
  'json-schema-oneOf': {
    '<*>': (...args: any[]) => new SchemaElement(...args),
  },
  'json-schema-prefixItems': {
    '<*>': (...args: any[]) => new SchemaElement(...args),
  },
};

const findElementFactory = (ancestor: any, keyName: string) => {
  const elementType = getNodeType(ancestor); // @ts-ignore
  const keyMapping = schema[elementType] || schema[ancestor.classes.first?.toValue?.()];

  return typeof keyMapping === 'undefined'
    ? undefined
    : Object.prototype.hasOwnProperty.call(keyMapping, '[key: *]')
    ? keyMapping['[key: *]']
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
        // @ts-ignore
        const elementFactory = findElementFactory(ancestor, element.key.toValue());

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        const originalValue = element.value as StringElement;

        return new MemberElement(
          element.key,
          elementFactory(undefined, originalValue.meta.clone(), originalValue.attributes.clone()),
          element.meta.clone(),
          element.attributes.clone(),
        );
      },

      StringElement(element: StringElement, ...rest: any) {
        if (!isEmptyElement(element)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1];

        // we're only interested in empty elements in ArrayElements
        if (!isArrayElement(ancestor)) return undefined;

        const elementFactory = findElementFactory(ancestor, '<*>');

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        return elementFactory(undefined, element.meta.clone(), element.attributes.clone());
      },
    },
  };
};

export default plugin;
