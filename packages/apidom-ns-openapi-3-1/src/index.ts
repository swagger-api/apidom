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

export { AlternatingVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { AlternatingVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { FixedFieldsVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { FixedFieldsVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { MapVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { MapVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { MixedFieldsVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { MixedFieldsVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { PatternedFieldsVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { PatternedFieldsVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { FallbackVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { SpecificationExtensionVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { SpecificationExtensionVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { SpecificationVisitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { SpecificationVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export { Visitor } from '@swagger-api/apidom-ns-openapi-3-0';
export type { VisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';

export type {
  default as CallbackVisitor,
  CallbackVisitorOptions,
} from './refractor/visitors/open-api-3-1/callback';
export type {
  ComponentsCallbacksVisitor,
  ComponentsCallbacksVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ComponentsExamplesVisitor,
  ComponentsExamplesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ComponentsHeadersVisitor,
  ComponentsHeadersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ComponentsVisitor,
  ComponentsVisitorOptions,
} from './refractor/visitors/open-api-3-1/components';
export type {
  ComponentsLinksVisitor,
  ComponentsLinksVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ComponentsParametersVisitor,
  ComponentsParametersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ComponentsRequestBodiesVisitor,
  ComponentsRequestBodiesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ComponentsResponsesVisitor,
  ComponentsResponsesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ComponentsPathItemsVisitor,
  PathItemsVisitorOptions as ComponentsPathItemsVisitorOptions,
} from './refractor/visitors/open-api-3-1/components/PathItemsVisitor';
export type {
  default as ComponentsSchemasVisitor,
  SchemasVisitorOptions as ComponentsSchemasVisitorOptions,
} from './refractor/visitors/open-api-3-1/components/SchemasVisitor';
export type {
  ComponentsSecuritySchemesVisitor,
  ComponentsSecuritySchemesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ContactVisitor,
  ContactVisitorOptions,
} from './refractor/visitors/open-api-3-1/contact';
export type {
  default as DiscriminatorVisitor,
  DiscriminatorVisitorOptions,
} from './refractor/visitors/open-api-3-1/distriminator';
export type {
  DiscriminatorMappingVisitor,
  DiscriminatorMappingVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  EncodingHeadersVisitor,
  EncodingHeadersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as EncodingVisitor,
  EncodingVisitorOptions,
} from './refractor/visitors/open-api-3-1/encoding';
export type {
  ExampleExternalValueVisitor,
  ExampleExternalValueVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ExampleVisitor,
  ExampleVisitorOptions,
} from './refractor/visitors/open-api-3-1/example';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
} from './refractor/visitors/open-api-3-1/external-documentation';
export type {
  HeaderContentVisitor,
  HeaderContentVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  HeaderExamplesVisitor,
  HeaderExamplesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as HeaderVisitor,
  HeaderVisitorOptions,
} from './refractor/visitors/open-api-3-1/header';
export type {
  HeaderSchemaVisitor,
  HeaderSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/open-api-3-1/info';
export type {
  InfoVersionVisitor,
  InfoVersionVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
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
  LinkOperationIdVisitor,
  LinkOperationIdVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  LinkOperationRefVisitor,
  LinkOperationRefVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  LinkParametersVisitor,
  LinkParametersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  MediaTypeEncodingVisitor,
  MediaTypeEncodingVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  MediaTypeExamplesVisitor,
  MediaTypeExamplesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as MediaTypeVisitor,
  MediaTypeVisitorOptions,
} from './refractor/visitors/open-api-3-1/media-type';
export type {
  MediaTypeSchemaVisitor,
  MediaTypeSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as OAuthFlowVisitor,
  OAuthFlowVisitorOptions,
} from './refractor/visitors/open-api-3-1/oauth-flow';
export type {
  OAuthFlowScopesVisitor,
  OAuthFlowScopesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as OAuthFlowsVisitor,
  OAuthFlowsVisitorOptions,
} from './refractor/visitors/open-api-3-1/oauth-flows';
export type {
  OperationCallbacksVisitor,
  OperationCallbacksVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
} from './refractor/visitors/open-api-3-1/operation';
export type {
  OperationParametersVisitor,
  OperationParametersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  OperationRequestBodyVisitor,
  OperationRequestBodyVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  OperationSecurityVisitor,
  OperationSecurityVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  OperationServersVisitor,
  OperationServersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  OperationTagsVisitor,
  OperationTagsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ParameterContentVisitor,
  ParameterContentVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ParameterExampleVisitor,
  ParameterExamplesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/open-api-3-1/parameter';
export type {
  ParameterSchemaVisitor,
  ParameterSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  PathItem$RefVisitor,
  PathItem$RefVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as PathItemVisitor,
  PathItemVisitorOptions,
} from './refractor/visitors/open-api-3-1/path-item';
export type {
  PathItemParametersVisitor,
  PathItemParametersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  PathItemServersVisitor,
  PathItemServersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as PathsVisitor,
  PathsVisitorOptions,
} from './refractor/visitors/open-api-3-1/paths';
export type {
  Reference$RefVisitor,
  Reference$RefVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/open-api-3-1/reference';
export type {
  RequestBodyContentVisitor,
  RequestBodyContentVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as RequestBodyVisitor,
  RequestBodyVisitorOptions,
} from './refractor/visitors/open-api-3-1/request-body';
export type {
  ResponseContentVisitor,
  ResponseContentVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ResponseHeadersVisitor,
  ResponseHeadersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ResponseVisitor,
  ResponseVisitorOptions,
} from './refractor/visitors/open-api-3-1/response';
export type {
  ResponseLinksVisitor,
  ResponseLinksVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ResponsesDefaultVisitor,
  ResponsesDefaultVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
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
  ServerVariableUrlVisitor,
  ServerVariableUrlVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ServerVariableVariablesVisitor,
  ServerVariableVariablesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
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
export type { ContentVisitor, ContentVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export type { ExamplesVisitor, ExamplesVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
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
export type { OpenapiVisitor, OpenapiVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  ParametersVisitor,
  ParametersVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type { SecurityVisitor, SecurityVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export type { ServersVisitor, ServersVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export type { TagsVisitor, TagsVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';

export type { SpecPath } from '@swagger-api/apidom-ns-openapi-3-0';

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
