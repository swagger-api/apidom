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

export { default as mediaTypes, OpenAPIMediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';
export { default as refractorPluginNormalizeParameters } from './refractor/plugins/normalize-parameters.ts';
export type { PluginOptions as RefractorPluginNormalizeParametersOptions } from './refractor/plugins/normalize-parameters.ts';
export { default as refractorPluginNormalizeSecurityRequirements } from './refractor/plugins/normalize-security-requirements.ts';
export type { PluginOptions as RefractorPluginNormalizeSecurityRequirementsOptions } from './refractor/plugins/normalize-security-requirements.ts';
export { default as refractorPluginNormalizeServers } from './refractor/plugins/normalize-servers.ts';
export type { PluginOptions as RefractorPluginNormalizeServersOptions } from './refractor/plugins/normalize-servers.ts';
export { default as refractorPluginNormalizeOperationIds } from './refractor/plugins/normalize-operation-ids.ts';
export type { PluginOptions as RefractorPluginNormalizeOperationIdsOptions } from './refractor/plugins/normalize-operation-ids.ts';
export { default as refractorPluginNormalizeParameterExamples } from './refractor/plugins/normalize-parameter-examples.ts';
export type { PluginOptions as RefractorPluginNormalizeParameterExamplesOptions } from './refractor/plugins/normalize-parameter-examples.ts';
export { default as refractorPluginNormalizeHeaderExamples } from './refractor/plugins/normalize-header-examples/index.ts';
export type { PluginOptions as RefractorPluginNormalizeHeaderExamplesOptions } from './refractor/plugins/normalize-header-examples/index.ts';
export { default as refractorPluginNormalizeDiscriminatorMapping } from './refractor/plugins/normalize-discriminator-mapping.ts';
export type { PluginOptions as RefractorPluginNormalizeDiscriminatorMappingOptions } from './refractor/plugins/normalize-discriminator-mapping.ts';
export { default as createToolbox } from './refractor/toolbox.ts';
export type {
  Predicates as ToolboxPredicates,
  openApi3_1Predicates,
  Toolbox,
  ancestorLineageToJSONPointer,
} from './refractor/toolbox.ts';
export { default as specificationObj } from './refractor/specification.ts';

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
  BaseCallbackVisitor,
} from './refractor/visitors/open-api-3-2/callback/index.ts';
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
  BaseComponentsVisitor,
} from './refractor/visitors/open-api-3-2/components/index.ts';
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
} from './refractor/visitors/open-api-3-2/components/PathItemsVisitor.ts';
export type {
  default as ComponentsSchemasVisitor,
  SchemasVisitorOptions as ComponentsSchemasVisitorOptions,
} from './refractor/visitors/open-api-3-2/components/SchemasVisitor.ts';
export type {
  ComponentsSecuritySchemesVisitor,
  ComponentsSecuritySchemesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ContactVisitor,
  ContactVisitorOptions,
  BaseContactVisitor,
} from './refractor/visitors/open-api-3-2/contact/index.ts';
export type {
  default as DiscriminatorVisitor,
  DiscriminatorVisitorOptions,
  BaseDiscriminatorVisitor,
} from './refractor/visitors/open-api-3-2/distriminator/index.ts';
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
  BaseEncodingVisitor,
} from './refractor/visitors/open-api-3-2/encoding/index.ts';
export type {
  ExampleExternalValueVisitor,
  ExampleExternalValueVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ExampleVisitor,
  ExampleVisitorOptions,
  BaseExampleVisitor,
} from './refractor/visitors/open-api-3-2/example/index.ts';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
  BaseExternalDocumentationVisitor,
} from './refractor/visitors/open-api-3-2/external-documentation/index.ts';
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
  BaseHeaderVisitor,
} from './refractor/visitors/open-api-3-2/header/index.ts';
export type {
  HeaderSchemaVisitor,
  HeaderSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
  BaseInfoVisitor,
} from './refractor/visitors/open-api-3-2/info/index.ts';
export type {
  InfoVersionVisitor,
  InfoVersionVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as LicenseVisitor,
  LicenseVisitorOptions,
  BaseLicenseVisitor,
} from './refractor/visitors/open-api-3-2/license/index.ts';
export type {
  default as LinkVisitor,
  LinkVisitorOptions,
  BaseLinkVisitor,
} from './refractor/visitors/open-api-3-2/link/index.ts';
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
  BaseMediaTypeVisitor,
} from './refractor/visitors/open-api-3-2/media-type/index.ts';
export type {
  MediaTypeSchemaVisitor,
  MediaTypeSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as OAuthFlowVisitor,
  OAuthFlowVisitorOptions,
  BaseOAuthFlowVisitor,
} from './refractor/visitors/open-api-3-2/oauth-flow/index.ts';
export type {
  OAuthFlowScopesVisitor,
  OAuthFlowScopesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as OAuthFlowsVisitor,
  OAuthFlowsVisitorOptions,
  BaseOAuthFlowsVisitor,
} from './refractor/visitors/open-api-3-2/oauth-flows/index.ts';
export type {
  OperationCallbacksVisitor,
  OperationCallbacksVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
  BaseOperationVisitor,
} from './refractor/visitors/open-api-3-2/operation/index.ts';
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
  BaseParameterVisitor,
} from './refractor/visitors/open-api-3-2/parameter/index.ts';
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
  BasePathItemVisitor,
} from './refractor/visitors/open-api-3-2/path-item/index.ts';
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
  BasePathsVisitor,
} from './refractor/visitors/open-api-3-2/paths/index.ts';
export type {
  Reference$RefVisitor,
  Reference$RefVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
  BaseReferenceVisitor,
} from './refractor/visitors/open-api-3-2/reference/index.ts';
export type {
  RequestBodyContentVisitor,
  RequestBodyContentVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as RequestBodyVisitor,
  RequestBodyVisitorOptions,
  BaseRequestBodyVisitor,
} from './refractor/visitors/open-api-3-2/request-body/index.ts';
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
  BaseResponseVisitor,
} from './refractor/visitors/open-api-3-2/response/index.ts';
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
  BaseResponsesVisitor,
} from './refractor/visitors/open-api-3-2/responses/index.ts';
export type {
  default as Schema$defsVisitor,
  $defsVisitorOptions as Schema$defsVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/$defsVisitor.ts';
export type { ParentSchemaAwareVisitorOptions } from '@swagger-api/apidom-ns-json-schema-2020-12';
export type {
  $refVisitor as Schema$refVisitor,
  $refVisitorOptions as Schema$refVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';
export type {
  $vocabularyVisitor as Schema$vocabularyVisitor,
  $vocabularyVisitorOptions as Schema$vocabularyVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';
export type {
  default as SchemaAllOfVisitor,
  AllOfVisitorOptions as SchemaAllOfVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/AllOfVisitor.ts';
export type {
  default as SchemaAnyOfVisitor,
  AnyOfVisitorOptions as SchemaAnyOfVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/AnyOfVisitor.ts';
export type {
  DependentRequiredVisitor as SchemaDependentRequiredVisitor,
  DependentRequiredVisitorOptions as SchemaDependentRequiredVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';
export type {
  default as SchemaDependentSchemasVisitor,
  DependentSchemasVisitorOptions as SchemaDependentSchemasVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/DependentSchemasVisitor.ts';
export type {
  default as SchemaVisitor,
  SchemaVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/index.ts';
export type {
  default as SchemaOneOfVisitor,
  OneOfVisitorOptions as SchemaOneOfVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/OneOfVisitor.ts';
export type {
  default as SchemaPatternPropertiesVisitor,
  PatternPropertiesVisitorOptions as SchemaPatternPropertiesVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/PatternPropertiesVisitor.ts';
export type {
  default as SchemaPrefixItemsVisitor,
  PrefixItemsVisitorOptions as SchemaPrefixItemsVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/PrefixItemsVisitor.ts';
export type {
  default as SchemaPropertiesVisitor,
  PropertiesVisitorOptions as SchemaPropertiesVisitorOptions,
} from './refractor/visitors/open-api-3-2/schema/PropertiesVisitor.ts';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
  BaseSecurityRequirementVisitor,
} from './refractor/visitors/open-api-3-2/security-requirement/index.ts';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
  BaseSecuritySchemeVisitor,
} from './refractor/visitors/open-api-3-2/security-scheme/index.ts';
export type {
  default as ServerVisitor,
  ServerVisitorOptions,
  BaseServerVisitor,
} from './refractor/visitors/open-api-3-2/server/index.ts';
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
  BaseServerVariableVisitor,
} from './refractor/visitors/open-api-3-2/server-variable/index.ts';
export type {
  default as TagVisitor,
  TagVisitorOptions,
  BaseTagVisitor,
} from './refractor/visitors/open-api-3-2/tag/index.ts';
export type {
  default as XmlVisitor,
  XmlVisitorOptions,
  BaseXMLVisitor,
} from './refractor/visitors/open-api-3-2/xml/index.ts';
export type { ContentVisitor, ContentVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export type { ExamplesVisitor, ExamplesVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';
export type {
  default as OpenApi3_2Visitor,
  OpenApi3_2VisitorOptions,
} from './refractor/visitors/open-api-3-2/index.ts';
export type {
  default as JsonSchemaDialectVisitor,
  JsonSchemaDialectVisitorOptions,
} from './refractor/visitors/open-api-3-2/JsonSchemaDialectVisitor.ts';
export type {
  default as WebhooksVisitor,
  WebhooksVisitorOptions,
} from './refractor/visitors/open-api-3-2/WebhooksVisitor.ts';
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
  isOpenApi3_2Element,
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
  isSecuritySchemeElement,
  isExternalDocumentationElement,
  isServerVariableElement,
  isContactElement,
  isExampleElement,
  isLinkElement,
  isRequestBodyElement,
  isPathsElement,
} from './predicates.ts';

export {
  isReferenceLikeElement,
  isOpenApiExtension,
  isServerLikeElement,
  isServersElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

export { keyMap, getNodeType } from './traversal/visitor.ts';

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
  OpenApi3_2Element,
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
} from './refractor/registration.ts';
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
export { default as ComponentsPathItemsElement } from './elements/nces/ComponentsPathItems.ts';
export { default as WebhooksElement } from './elements/nces/Webhooks.ts';
