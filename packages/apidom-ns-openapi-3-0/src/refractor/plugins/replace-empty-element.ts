import {
  ArrayElement,
  ObjectElement,
  StringElement,
  isStringElement,
  isArrayElement,
  isElement,
  isMemberElement,
  includesClasses,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

/**
 * OpenAPI 3.0.x specification elements.
 */
import InfoElement from '../../elements/Info.ts';
import ContactElement from '../../elements/Contact.ts';
import LicenseElement from '../../elements/License.ts';
import PathsElement from '../../elements/Paths.ts';
import PathItemElement from '../../elements/PathItem.ts';
import ComponentsElement from '../../elements/Components.ts';
import ExternalDocumentationElement from '../../elements/ExternalDocumentation.ts';
import OperationElement from '../../elements/Operation.ts';
import SchemaElement from '../../elements/Schema.ts';
import RequestBodyElement from '../../elements/RequestBody.ts';
import ResponsesElement from '../../elements/Responses.ts';
import ResponseElement from '../../elements/Response.ts';
import ServerElement from '../../elements/Server.ts';
import DiscriminatorElement from '../../elements/Discriminator.ts';
import XmlElement from '../../elements/Xml.ts';
import OAuthFlowsElement from '../../elements/OAuthFlows.ts';
import OAuthFlowElement from '../../elements/OAuthFlow.ts';
import ServerVariableElement from '../../elements/ServerVariable.ts';
import ParameterElement from '../../elements/Parameter.ts';
import ExampleElement from '../../elements/Example.ts';
import HeaderElement from '../../elements/Header.ts';
import SecuritySchemeElement from '../../elements/SecurityScheme.ts';
import LinkElement from '../../elements/Link.ts';
import CallbackElement from '../../elements/Callback.ts';
import MediaTypeElement from '../../elements/MediaType.ts';
import EncodingElement from '../../elements/Encoding.ts';
import SecurityRequirementElement from '../../elements/SecurityRequirement.ts';
import TagElement from '../../elements/Tag.ts';
// non-concrete Elements (NCEs)
import ServersElement from '../../elements/nces/Servers.ts';
import SecurityElement from '../../elements/nces/Security.ts';
import TagsElement from '../../elements/nces/Tags.ts';
import ServerVariablesElement from '../../elements/nces/ServerVariables.ts';
import ComponentsSchemasElement from '../../elements/nces/ComponentsSchemas.ts';
import ComponentsResponsesElement from '../../elements/nces/ComponentsResponses.ts';
import ComponentsParametersElement from '../../elements/nces/ComponentsParameters.ts';
import ComponentsExamplesElement from '../../elements/nces/ComponentsExamples.ts';
import ComponentsRequestBodiesElement from '../../elements/nces/ComponentsRequestBodies.ts';
import ComponentsHeadersElement from '../../elements/nces/ComponentsHeaders.ts';
import ComponentsSecuritySchemesElement from '../../elements/nces/ComponentsSecuritySchemes.ts';
import ComponentsLinksElement from '../../elements/nces/ComponentsLinks.ts';
import ComponentsCallbacksElement from '../../elements/nces/ComponentsCallbacks.ts';
import PathItemServersElement from '../../elements/nces/PathItemServers.ts';
import PathItemParametersElement from '../../elements/nces/PathItemParameters.ts';
import OperationParametersElement from '../../elements/nces/OperationParameters.ts';
import ParameterExamplesElement from '../../elements/nces/ParameterExamples.ts';
import ParameterContentElement from '../../elements/nces/ParameterContent.ts';
import OperationTagsElement from '../../elements/nces/OperationTags.ts';
import OperationCallbacksElement from '../../elements/nces/OperationCallbacks.ts';
import OperationSecurityElement from '../../elements/nces/OperationSecurity.ts';
import OperationServersElement from '../../elements/nces/OperationServers.ts';
import RequestBodyContentElement from '../../elements/nces/RequestBodyContent.ts';
import MediaTypeExamplesElement from '../../elements/nces/MediaTypeExamples.ts';
import MediaTypeEncodingElement from '../../elements/nces/MediaTypeEncoding.ts';
import EncodingHeadersElement from '../../elements/nces/EncodingHeaders.ts';
import ResponseHeadersElement from '../../elements/nces/ResponseHeaders.ts';
import ResponseContentElement from '../../elements/nces/ResponseContent.ts';
import ResponseLinksElement from '../../elements/nces/ResponseLinks.ts';
import DiscriminatorMappingElement from '../../elements/nces/DiscriminatorMapping.ts';
import OAuthFlowScopesElement from '../../elements/nces/OAuthFlowScopes.ts';
import LinkParametersElement from '../../elements/nces/LinkParameters.ts';
import HeaderExamplesElement from '../../elements/nces/HeaderExamples.ts';
import HeaderContentElement from '../../elements/nces/HeaderContent.ts';
import { getNodeType } from '../../traversal/visitor.ts';

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
 * openapi: 3.0.4
 * info:
 * ```
 * Refracting result without this plugin:
 *
 *  (OpenApi3_0Element
 *    (MemberElement
 *      (StringElement)
 *      (OpenapiElement))
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *
 * Refracting result with this plugin:
 *
 *  (OpenApi3_0Element
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
  OpenApi3_0Element: {
    info(...args: any[]) {
      return new InfoElement(...args);
    },
    servers(...args: any[]) {
      return new ServersElement(...args);
    },
    paths(...args: any[]) {
      return new PathsElement(...args);
    },
    components(...args: any[]) {
      return new ComponentsElement(...args);
    },
    security(...args: any[]) {
      return new SecurityElement(...args);
    },
    tags(...args: any[]) {
      return new TagsElement(...args);
    },
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
  },
  InfoElement: {
    contact(...args: any[]) {
      return new ContactElement(...args);
    },
    license(...args: any[]) {
      return new LicenseElement(...args);
    },
  },
  ServerElement: {
    variables(...args: any[]) {
      return new ServerVariablesElement(...args);
    },
  },
  ServerVariableElement: {
    enum(...args: any[]) {
      return new ArrayElement(...args);
    },
  },
  PathsElement: {
    '[key: *]': function key(...args: any[]) {
      return new PathItemElement(...args);
    },
  },
  PathItemElement: {
    get(...args: any[]) {
      return new OperationElement(...args);
    },
    put(...args: any[]) {
      return new OperationElement(...args);
    },
    post(...args: any[]) {
      return new OperationElement(...args);
    },
    delete(...args: any[]) {
      return new OperationElement(...args);
    },
    options(...args: any[]) {
      return new OperationElement(...args);
    },
    head(...args: any[]) {
      return new OperationElement(...args);
    },
    patch(...args: any[]) {
      return new OperationElement(...args);
    },
    trace(...args: any[]) {
      return new OperationElement(...args);
    },
    servers(...args: any[]) {
      return new PathItemServersElement(...args);
    },
    parameters(...args: any[]) {
      return new PathItemParametersElement(...args);
    },
  },
  OperationElement: {
    tags(...args: any[]) {
      return new OperationTagsElement(...args);
    },
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
    parameters(...args: any[]) {
      return new OperationParametersElement(...args);
    },
    requestBody(...args: any[]) {
      return new RequestBodyElement(...args);
    },
    responses(...args: any[]) {
      return new ResponsesElement(...args);
    },
    callbacks(...args: any[]) {
      return new OperationCallbacksElement(...args);
    },
    security(...args: any[]) {
      return new OperationSecurityElement(...args);
    },
    servers(...args: any[]) {
      return new OperationServersElement(...args);
    },
  },
  ParameterElement: {
    schema(...args: any[]) {
      return new SchemaElement(...args);
    },
    examples(...args: any[]) {
      return new ParameterExamplesElement(...args);
    },
    content(...args: any[]) {
      return new ParameterContentElement(...args);
    },
  },
  RequestBodyElement: {
    content(...args: any[]) {
      return new RequestBodyContentElement(...args);
    },
  },
  MediaTypeElement: {
    schema(...args: any[]) {
      return new SchemaElement(...args);
    },
    examples(...args: any[]) {
      return new MediaTypeExamplesElement(...args);
    },
    encoding(...args: any[]) {
      return new MediaTypeEncodingElement(...args);
    },
  },
  EncodingElement: {
    headers(...args: any[]) {
      return new EncodingHeadersElement(...args);
    },
  },
  ResponsesElement: {
    '[key: *]': function key(...args: any[]) {
      return new ResponseElement(...args);
    },
  },
  ResponseElement: {
    headers(...args: any[]) {
      return new ResponseHeadersElement(...args);
    },
    content(...args: any[]) {
      return new ResponseContentElement(...args);
    },
    links(...args: any[]) {
      return new ResponseLinksElement(...args);
    },
  },
  CallbackElement: {
    '[key: *]': function key(...args: any[]) {
      return new PathItemElement(...args);
    },
  },
  LinkElement: {
    parameters(...args: any[]) {
      return new LinkParametersElement(...args);
    },
    server(...args: any[]) {
      return new ServerElement(...args);
    },
  },
  HeaderElement: {
    schema(...args: any[]) {
      return new SchemaElement(...args);
    },
    examples(...args: any[]) {
      return new HeaderExamplesElement(...args);
    },
    content(...args: any[]) {
      return new HeaderContentElement(...args);
    },
  },
  ComponentsElement: {
    schemas(...args: any[]) {
      return new ComponentsSchemasElement(...args);
    },
    responses(...args: any[]) {
      return new ComponentsResponsesElement(...args);
    },
    parameters(...args: any[]) {
      return new ComponentsParametersElement(...args);
    },
    examples(...args: any[]) {
      return new ComponentsExamplesElement(...args);
    },
    requestBodies(...args: any[]) {
      return new ComponentsRequestBodiesElement(...args);
    },
    headers(...args: any[]) {
      return new ComponentsHeadersElement(...args);
    },
    securitySchemes(...args: any[]) {
      return new ComponentsSecuritySchemesElement(...args);
    },
    links(...args: any[]) {
      return new ComponentsLinksElement(...args);
    },
    callbacks(...args: any[]) {
      return new ComponentsCallbacksElement(...args);
    },
  },
  SecurityRequirementElement: {
    '[key: *]': function key(...args: any[]) {
      return new ArrayElement(...args);
    },
  },
  TagElement: {
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
  },
  SchemaElement: {
    definitions(...args: any[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-definitions');
      return element;
    },
    allOf(...args: any[]) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-allOf');
      return element;
    },
    anyOf(...args: any[]) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-anyOf');
      return element;
    },
    oneOf(...args: any[]) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-oneOf');
      return element;
    },
    not(...args: any[]) {
      return new SchemaElement(...args);
    },
    items(...args: any[]) {
      return new SchemaElement(...args);
    },
    properties(...args: any[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-properties');
      return element;
    },
    patternProperties(...args: any[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-patternProperties');
      return element;
    },
    additionalProperties(...args: any[]) {
      return new SchemaElement(...args);
    },
    enum(...args: any[]) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-enum');
      return element;
    },
    required(...args: any[]) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-required');
      return element;
    },
    discriminator(...args: any[]) {
      return new DiscriminatorElement(...args);
    },
    xml(...args: any[]) {
      return new XmlElement(...args);
    },
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
  },
  DiscriminatorElement: {
    mapping(...args: any[]) {
      return new DiscriminatorMappingElement(...args);
    },
  },
  SecuritySchemeElement: {
    flows(...args: any[]) {
      return new OAuthFlowsElement(...args);
    },
  },
  OAuthFlowsElement: {
    implicit(...args: any[]) {
      return new OAuthFlowElement(...args);
    },
    password(...args: any[]) {
      return new OAuthFlowElement(...args);
    },
    clientCredentials(...args: any[]) {
      return new OAuthFlowElement(...args);
    },
    authorizationCode(...args: any[]) {
      return new OAuthFlowElement(...args);
    },
  },
  OAuthFlowElement: {
    scopes(...args: any[]) {
      return new OAuthFlowScopesElement(...args);
    },
  },
  // non-concrete types handling (NCEs)
  [ServerVariablesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new ServerVariableElement(...args);
    },
  },
  [ComponentsSchemasElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  [ComponentsResponsesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new ResponseElement(...args);
    },
  },
  [ComponentsParametersElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new ParameterElement(...args);
    },
  },
  [ComponentsExamplesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new ExampleElement(...args);
    },
  },
  [ComponentsRequestBodiesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new RequestBodyElement(...args);
    },
  },
  [ComponentsHeadersElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new HeaderElement(...args);
    },
  },
  [ComponentsSecuritySchemesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new SecuritySchemeElement(...args);
    },
  },
  [ComponentsLinksElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new LinkElement(...args);
    },
  },
  [ComponentsCallbacksElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new CallbackElement(...args);
    },
  },
  [OperationCallbacksElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new CallbackElement(...args);
    },
  },
  [ParameterExamplesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new ExampleElement(...args);
    },
  },
  [ParameterContentElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new MediaTypeElement(...args);
    },
  },
  [RequestBodyContentElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new MediaTypeElement(...args);
    },
  },
  [MediaTypeExamplesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new ExampleElement(...args);
    },
  },
  [MediaTypeEncodingElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new EncodingElement(...args);
    },
  },
  [EncodingHeadersElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new HeaderElement(...args);
    },
  },
  [ResponseHeadersElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new HeaderElement(...args);
    },
  },
  [ResponseContentElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new MediaTypeElement(...args);
    },
  },
  [ResponseLinksElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new LinkElement(...args);
    },
  },
  'json-schema-$defs': {
    '[key: *]': function key(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  'json-schema-dependentSchemas': {
    '[key: *]': function key(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  'json-schema-properties': {
    '[key: *]': function key(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  [ServersElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new ServerElement(...args);
    },
  },
  [SecurityElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new SecurityRequirementElement(...args);
    },
  },
  [TagsElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new TagElement(...args);
    },
  },
  [PathItemServersElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new ServerElement(...args);
    },
  },
  [PathItemParametersElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new ParameterElement(...args);
    },
  },
  [OperationParametersElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new ParameterElement(...args);
    },
  },
  [OperationSecurityElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new SecurityRequirementElement(...args);
    },
  },
  [OperationServersElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new ServerElement(...args);
    },
  },
  'json-schema-allOf': {
    '<*>': function asterisk(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  'json-schema-anyOf': {
    '<*>': function asterisk(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  'json-schema-oneOf': {
    '<*>': function asterisk(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  'json-schema-prefixItems': {
    '<*>': function asterisk(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
};

const findElementFactory = (ancestor: any, keyName: string) => {
  const elementType = getNodeType(ancestor); // @ts-ignore
  const keyMapping = schema[elementType] || schema[toValue(ancestor.classes.first)];

  return typeof keyMapping === 'undefined'
    ? undefined
    : Object.prototype.hasOwnProperty.call(keyMapping, '[key: *]')
      ? keyMapping['[key: *]']
      : keyMapping[keyName];
};

/**
 * @public
 */
const plugin = () => () => ({
  visitor: {
    StringElement(element: StringElement, key: any, parent: any, path: any, ancestors: any[]) {
      if (!isEmptyElement(element)) return undefined;

      const lineage = [...ancestors, parent].filter(isElement);
      const parentElement = lineage[lineage.length - 1]; // @TODO(vladimir.gorej@gmail.com): can be replaced by Array.prototype.at in future
      let elementFactory;
      let context;

      if (isArrayElement(parentElement)) {
        context = element;
        elementFactory = findElementFactory(parentElement, '<*>');
      } else if (isMemberElement(parentElement)) {
        context = lineage[lineage.length - 2]; // @TODO(vladimir.gorej@gmail.com): can be replaced by Array.prototype.at in future
        elementFactory = findElementFactory(context, toValue(parentElement.key));
      }

      // no element factory found
      if (typeof elementFactory !== 'function') return undefined;

      return elementFactory.call(
        { context },
        undefined,
        cloneDeep(element.meta),
        cloneDeep(element.attributes),
      );
    },
  },
});

export default plugin;
