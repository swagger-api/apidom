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

export type {
  default as CallbackVisitor,
  CallbackVisitorOptions,
} from './refractor/visitors/open-api-3-1/callback';
export type {
  default as ComponentsVisitor,
  ComponentsVisitorOptions,
} from './refractor/visitors/open-api-3-1/components';
export type {
  default as ComponentsPathItemsVisitor,
  PathItemsVisitorOptions as ComponentsPathItemsVisitorOptions,
} from './refractor/visitors/open-api-3-1/components/PathItemsVisitor';
export type {
  default as ComponentsSchemasVisitor,
  SchemasVisitorOptions as ComponentsSchemasVisitorOptions,
} from './refractor/visitors/open-api-3-1/components/SchemasVisitor';
export type {
  default as ContactVisitor,
  ContactVisitorOptions,
} from './refractor/visitors/open-api-3-1/contact';
export type {
  default as DiscriminatorVisitor,
  DiscriminatorVisitorOptions,
} from './refractor/visitors/open-api-3-1/distriminator';
export type {
  default as EncodingVisitor,
  EncodingVisitorOptions,
} from './refractor/visitors/open-api-3-1/encoding';
export type {
  default as ExampleVisitor,
  ExampleVisitorOptions,
} from './refractor/visitors/open-api-3-1/example';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
} from './refractor/visitors/open-api-3-1/external-documentation';
export type {
  default as HeaderVisitor,
  HeaderVisitorOptions,
} from './refractor/visitors/open-api-3-1/header';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/open-api-3-1/info';
export type {
  default as InfoSummaryVisitor,
  SummaryVisitorOption as InfoSummaryVisitorOption,
} from './refractor/visitors/open-api-3-1/info/SummaryVisitor';
export type {
  default as LicenseIdentifierVisitor,
  IdentifierVisitorOption as LicenseIdentifierVisitorOption,
} from './refractor/visitors/open-api-3-1/license/IdentifierVisitor';
export type {
  default as LicenseVisitor,
  LicenseVisitorOptions,
} from './refractor/visitors/open-api-3-1/license';
export type {
  default as LinkVisitor,
  LinkVisitorOptions,
} from './refractor/visitors/open-api-3-1/link';
export type {
  default as MediaTypeVisitor,
  MediaTypeVisitorOptions,
} from './refractor/visitors/open-api-3-1/media-type';
export type {
  default as OAuthFlowVisitor,
  OAuthFlowVisitorOptions,
} from './refractor/visitors/open-api-3-1/oauth-flow';
export type {
  default as OAuthFlowsVisitor,
  OAuthFlowsVisitorOptions,
} from './refractor/visitors/open-api-3-1/oauth-flows';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
} from './refractor/visitors/open-api-3-1/operation';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/open-api-3-1/parameter';
export type {
  default as PathItemVisitor,
  PathItemVisitorOptions,
} from './refractor/visitors/open-api-3-1/path-item';
export type {
  default as PathsVisitor,
  PathsVisitorOptions,
} from './refractor/visitors/open-api-3-1/paths';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/open-api-3-1/reference';
export type {
  default as RequestBodyVisitor,
  RequestBodyVisitorOptions,
} from './refractor/visitors/open-api-3-1/request-body';
export type {
  default as ResponseVisitor,
  ResponseVisitorOptions,
} from './refractor/visitors/open-api-3-1/response';
export type {
  default as ResponsesVisitor,
  ResponsesVisitorOptions,
} from './refractor/visitors/open-api-3-1/responses';
export type {
  default as Schema$defsVisitor,
  $defsVisitorOptions as Schema$defsVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/$defsVisitor';
export type {
  default as Schema$refVisitor,
  $refVisitorOptions as Schema$refVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/$refVisitor';
export type {
  default as Schema$vocabularyVisitor,
  $vocabularyVisitorOptions as Schema$vocabularyVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/$vocabularyVisitor';
export type {
  default as SchemaAllOfVisitor,
  AllOfVisitorOptions as SchemaAllOfVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/AllOfVisitor';
export type {
  default as SchemaAnyOfVisitor,
  AnyOfVisitorOptions as SchemaAnyOfVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/AnyOfVisitor';
export type {
  default as SchemaDependentRequiredVisitor,
  DependentRequiredVisitorOptions as SchemaDependentRequiredVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/DependentRequiredVisitor';
export type {
  default as SchemaDependentSchemasVisitor,
  DependentSchemasVisitorOptions as SchemaDependentSchemasVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/DependentSchemasVisitor';
export type {
  default as SchemaEnumVisitor,
  EnumVisitorOptions as SchemaEnumVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/EnumVisitor';
export type {
  default as SchemaExamplesVisitor,
  ExamplesVisitorOptions as SchemaExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/ExamplesVisitor';
export type {
  default as SchemaVisitor,
  SchemaVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema';
export type {
  default as SchemaOneOfVisitor,
  OneOfVisitorOptions as SchemaOneOfVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/OneOfVisitor';
export type {
  default as SchemaPatternPropertiesVisitor,
  PatternPropertiesVisitorOptions as SchemaPatternPropertiesVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/PatternPropertiesVisitor';
export type {
  default as SchemaPrefixItemsVisitor,
  PrefixItemsVisitorOptions as SchemaPrefixItemsVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/PrefixItemsVisitor';
export type {
  default as SchemaPropertiesVisitor,
  PropertiesVisitorOptions as SchemaPropertiesVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/PropertiesVisitor';
export type {
  default as SchemaRequiredVisitor,
  RequiredVisitorOptions as SchemaRequiredVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/RequiredVisitor';
export type {
  default as SchemaTypeVisitor,
  TypeVisitorOptions as SchemaTypeVisitorOptions,
} from './refractor/visitors/open-api-3-1/schema/TypeVisitor';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
} from './refractor/visitors/open-api-3-1/security-requirement';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
} from './refractor/visitors/open-api-3-1/security-scheme';
export type {
  default as ServerVisitor,
  ServerVisitorOptions,
} from './refractor/visitors/open-api-3-1/server';
export type {
  default as ServerVariableVisitor,
  ServerVariableVisitorOptions,
} from './refractor/visitors/open-api-3-1/server-variable';
export type {
  default as TagVisitor,
  TagVisitorOptions,
} from './refractor/visitors/open-api-3-1/tag';
export type {
  default as XmlVisitor,
  XmlVisitorOptions,
} from './refractor/visitors/open-api-3-1/xml';
export type {
  default as OpenApi3_1Visitor,
  OpenApi3_1VisitorOptions,
} from './refractor/visitors/open-api-3-1';
export type {
  default as JsonSchemaDialectVisitor,
  JsonSchemaDialectVisitorOptions,
} from './refractor/visitors/open-api-3-1/JsonSchemaDialectVisitor';
export type {
  default as WebhooksVisitor,
  WebhooksVisitorOptions,
} from './refractor/visitors/open-api-3-1/WebhooksVisitor';

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
