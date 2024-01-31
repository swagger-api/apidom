export {
  isRefElement,
  isLinkElement as isLinkPrimitiveElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as mediaTypes, OpenAPIMediaTypes } from './media-types';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element';
export { default as refractorPluginNormalizeParameters } from './refractor/plugins/normalize-parameters';
export { default as refractorPluginNormalizeSecurityRequirements } from './refractor/plugins/normalize-security-requirements';
export { default as refractorPluginNormalizeServers } from './refractor/plugins/normalize-servers';
export { default as refractorPluginNormalizeOperationIds } from './refractor/plugins/normalize-operation-ids';
export { default as refractorPluginNormalizeParameterExamples } from './refractor/plugins/normalize-parameter-examples';
export { default as refractorPluginNormalizeHeaderExamples } from './refractor/plugins/normalize-header-examples';
export { default as createToolbox } from './refractor/toolbox';
export { default as specificationObj } from './refractor/specification';

export type { SchemaVisitorOptions } from './refractor/visitors/open-api-3-1/schema';
export type { PropertiesVisitorOptions } from './refractor/visitors/open-api-3-1/schema/PropertiesVisitor';
export type { PrefixItemsVisitorOptions } from './refractor/visitors/open-api-3-1/schema/PrefixItemsVisitor';
export type { OneOfVisitorOptions } from './refractor/visitors/open-api-3-1/schema/OneOfVisitor';
export type { PatternPropertiesVisitorOptions } from './refractor/visitors/open-api-3-1/schema/PatternPropertiesVisitor';
export type { DependentSchemasVisitorOptions } from './refractor/visitors/open-api-3-1/schema/DependentSchemasVisitor';
export type { $defsVisitorOptions } from './refractor/visitors/open-api-3-1/schema/$defsVisitor';
export type { AllOfVisitorOptions } from './refractor/visitors/open-api-3-1/schema/AllOfVisitor';
export type { AnyOfVisitorOptions } from './refractor/visitors/open-api-3-1/schema/AnyOfVisitor';

export {
  isCallbackElement,
  isComponentsElement,
  isInfoElement,
  isJsonSchemaDialectElement,
  isLicenseElement,
  isOpenapiElement,
  isOpenApi3_1Element,
  isOperationElement,
  isParameterElement,
  isPathItemElement,
  isPathItemElementExternal,
  isReferenceElement,
  isReferenceElementExternal,
  isResponseElement,
  isResponsesElement,
  isSchemaElement,
  isBooleanJsonSchemaElement,
  isMediaTypeElement,
  isServerElement,
  isSecurityRequirementElement,
  isExternalDocumentationElement,
  isServerVariableElement,
  isContactElement,
  isExampleElement,
  isLinkElement,
  isRequestBodyElement,
  isPathsElement,
} from './predicates';

export {
  isReferenceLikeElement,
  isOpenApiExtension,
  isServerLikeElement,
  isServersElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

export { keyMap, getNodeType } from './traversal/visitor';

// OpenAPI 3.1.0 elements
export {
  CallbackElement,
  ComponentsElement,
  ContactElement,
  DiscriminatorElement,
  EncodingElement,
  ExampleElement,
  ExternalDocumentationElement,
  HeaderElement,
  InfoElement,
  JsonSchemaDialectElement,
  LicenseElement,
  LinkElement,
  MediaTypeElement,
  OAuthFlowElement,
  OAuthFlowsElement,
  OpenapiElement,
  OpenApi3_1Element,
  OperationElement,
  ParameterElement,
  PathItemElement,
  PathsElement,
  ReferenceElement,
  RequestBodyElement,
  ResponseElement,
  ResponsesElement,
  SchemaElement,
  SecurityRequirementElement,
  SecuritySchemeElement,
  ServerElement,
  ServerVariableElement,
  TagElement,
  XmlElement,
} from './refractor/registration';
// NCE types
export {
  ComponentsCallbacksElement,
  ComponentsExamplesElement,
  ComponentsHeadersElement,
  ComponentsLinksElement,
  ComponentsParametersElement,
  ComponentsRequestBodiesElement,
  ComponentsResponsesElement,
  ComponentsSchemasElement,
  ComponentsSecuritySchemesElement,
  DiscriminatorMappingElement,
  EncodingHeadersElement,
  HeaderContentElement,
  HeaderExamplesElement,
  LinkParametersElement,
  MediaTypeEncodingElement,
  MediaTypeExamplesElement,
  OAuthFlowScopesElement,
  OperationCallbacksElement,
  OperationParametersElement,
  OperationSecurityElement,
  OperationServersElement,
  OperationTagsElement,
  ParameterContentElement,
  ParameterExamplesElement,
  PathItemParametersElement,
  PathItemServersElement,
  RequestBodyContentElement,
  ResponseContentElement,
  ResponseHeadersElement,
  ResponseLinksElement,
  SecurityElement,
  ServersElement,
  ServerVariablesElement,
  TagsElement,
} from '@swagger-api/apidom-ns-openapi-3-0';
export { default as ComponentsPathItemsElement } from './elements/nces/ComponentsPathItems';
export { default as WebhooksElement } from './elements/nces/Webhooks';
