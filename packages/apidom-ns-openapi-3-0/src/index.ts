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

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as createToolbox } from './refractor/toolbox.ts';
export type { Predicates as ToolboxPredicates } from './refractor/toolbox.ts';
export { default as specificationObj } from './refractor/specification.ts';

export {
  isCallbackElement,
  isComponentsElement,
  isContactElement,
  isExampleElement,
  isExternalDocumentationElement,
  isInfoElement,
  isLicenseElement,
  isLinkElement,
  isOpenapiElement,
  isOpenApi3_0Element,
  isOperationElement,
  isParameterElement,
  isPathItemElement,
  isPathsElement,
  isReferenceElement,
  isRequestBodyElement,
  isResponseElement,
  isResponsesElement,
  isSchemaElement,
  isBooleanJsonSchemaElement,
  isSecurityRequirementElement,
  isSecuritySchemeElement,
  isServerElement,
  isServerVariableElement,
  isMediaTypeElement,
  isServersElement,
} from './predicates.ts';

export {
  isReferenceLikeElement,
  isServerLikeElement,
  isTagLikeElement,
  isOpenApiExtension,
} from './refractor/predicates.ts';

export { default as AlternatingVisitor } from './refractor/visitors/generics/AlternatingVisitor.ts';
export type { AlternatingVisitorOptions } from './refractor/visitors/generics/AlternatingVisitor.ts';
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor.ts';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor.ts';
export { default as MixedFieldsVisitor } from './refractor/visitors/generics/MixedFieldsVisitor.ts';
export type { MixedFieldsVisitorOptions } from './refractor/visitors/generics/MixedFieldsVisitor.ts';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor.ts';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor.ts';
export { default as SpecificationExtensionVisitor } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export type { SpecificationExtensionVisitorOptions } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor.ts';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor.ts';
export { default as Visitor } from './refractor/visitors/Visitor.ts';
export type { VisitorOptions } from './refractor/visitors/Visitor.ts';

export type {
  default as CallbackVisitor,
  CallbackVisitorOptions,
} from './refractor/visitors/open-api-3-0/callback/index.ts';
export type {
  default as ComponentsCallbacksVisitor,
  CallbackVisitorOptions as ComponentsCallbacksVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/CallbacksVisitor.ts';
export type {
  default as ComponentsExamplesVisitor,
  ExamplesVisitorOptions as ComponentsExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/ExamplesVisitor.ts';
export type {
  default as ComponentsHeadersVisitor,
  HeadersVisitorOptions as ComponentsHeadersVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/HeadersVisitor.ts';
export type {
  default as ComponentsVisitor,
  ComponentsVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/index.ts';
export type {
  default as ComponentsLinksVisitor,
  LinksVisitorOptions as ComponentsLinksVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/LinksVisitor.ts';
export type {
  default as ComponentsParametersVisitor,
  ParametersVisitorOptions as ComponentsParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/ParametersVisitor.ts';
export type {
  default as ComponentsRequestBodiesVisitor,
  RequestBodiesVisitorOptions as ComponentsRequestBodiesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/RequestBodiesVisitor.ts';
export type {
  default as ComponentsResponsesVisitor,
  ResponsesVisitorOptions as ComponentsResponsesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/ResponsesVisitor.ts';
export type {
  default as ComponentsSchemasVisitor,
  SchemasVisitorOptions as ComponentsSchemasVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/SchemasVisitor.ts';
export type {
  default as ComponentsSecuritySchemesVisitor,
  SecuritySchemesVisitorOptions as ComponentsSecuritySchemesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/SecuritySchemesVisitor.ts';
export type {
  default as ContactVisitor,
  ContactVisitorOptions,
} from './refractor/visitors/open-api-3-0/contact/index.ts';
export type {
  default as DiscriminatorVisitor,
  DiscriminatorVisitorOptions,
} from './refractor/visitors/open-api-3-0/distriminator/index.ts';
export type {
  default as DiscriminatorMappingVisitor,
  MappingVisitorOptions as DiscriminatorMappingVisitorOptions,
} from './refractor/visitors/open-api-3-0/distriminator/MappingVisitor.ts';
export type {
  default as EncodingHeadersVisitor,
  HeadersVisitorOptions as EncodingHeadersVisitorOptions,
} from './refractor/visitors/open-api-3-0/encoding/HeadersVisitor.ts';
export type {
  default as EncodingVisitor,
  EncodingVisitorOptions,
} from './refractor/visitors/open-api-3-0/encoding/index.ts';
export type {
  default as ExampleExternalValueVisitor,
  ExternalValueVisitorOptions as ExampleExternalValueVisitorOptions,
} from './refractor/visitors/open-api-3-0/example/ExternalValueVisitor.ts';
export type {
  default as ExampleVisitor,
  ExampleVisitorOptions,
} from './refractor/visitors/open-api-3-0/example/index.ts';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
} from './refractor/visitors/open-api-3-0/external-documentation/index.ts';
export type {
  default as HeaderContentVisitor,
  ContentVisitorOptions as HeaderContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/header/ContentVisitor.ts';
export type {
  default as HeaderExamplesVisitor,
  ExamplesVisitorOptions as HeaderExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/header/ExamplesVisitor.ts';
export type {
  default as HeaderVisitor,
  HeaderVisitorOptions,
} from './refractor/visitors/open-api-3-0/header/index.ts';
export type {
  default as HeaderSchemaVisitor,
  SchemaVisitorOptions as HeaderSchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/header/SchemaVisitor.ts';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/open-api-3-0/info/index.ts';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/open-api-3-0/info/VersionVisitor.ts';
export type {
  default as LicenseVisitor,
  LicenseVisitorOptions,
} from './refractor/visitors/open-api-3-0/license/index.ts';
export type {
  default as LinkVisitor,
  LinkVisitorOptions,
} from './refractor/visitors/open-api-3-0/link/index.ts';
export type {
  default as LinkOperationIdVisitor,
  OperationIdVisitorOptions as LinkOperationIdVisitorOptions,
} from './refractor/visitors/open-api-3-0/link/OperationIdVisitor.ts';
export type {
  default as LinkOperationRefVisitor,
  OperationRefVisitorOptions as LinkOperationRefVisitorOptions,
} from './refractor/visitors/open-api-3-0/link/OperationRefVisitor.ts';
export type {
  default as LinkParametersVisitor,
  ParametersVisitorOptions as LinkParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/link/ParametersVisitor.ts';
export type {
  default as MediaTypeEncodingVisitor,
  EncodingVisitorOptions as MediaTypeEncodingVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type/EncodingVisitor.ts';
export type {
  default as MediaTypeExamplesVisitor,
  ExamplesVisitorOptions as MediaTypeExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type/ExamplesVisitor.ts';
export type {
  default as MediaTypeVisitor,
  MediaTypeVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type/index.ts';
export type {
  default as MediaTypeSchemaVisitor,
  SchemaVisitorOptions as MediaTypeSchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type/SchemaVisitor.ts';
export type {
  default as OAuthFlowVisitor,
  OAuthFlowVisitorOptions,
} from './refractor/visitors/open-api-3-0/oauth-flow/index.ts';
export type {
  default as OAuthFlowScopesVisitor,
  ScopesVisitorOptions as OAuthFlowScopesVisitorOptions,
} from './refractor/visitors/open-api-3-0/oauth-flow/ScopesVisitor.ts';
export type {
  default as OAuthFlowsVisitor,
  OAuthFlowsVisitorOptions,
} from './refractor/visitors/open-api-3-0/oauth-flows/index.ts';
export type {
  default as OperationCallbacksVisitor,
  CallbacksVisitorOptions as OperationCallbacksVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/CallbacksVisitor.ts';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/index.ts';
export type {
  default as OperationParametersVisitor,
  ParametersVisitorOptions as OperationParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/ParametersVisitor.ts';
export type {
  default as OperationRequestBodyVisitor,
  RequestBodyVisitorOptions as OperationRequestBodyVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/RequestBodyVisitor.ts';
export type {
  default as OperationSecurityVisitor,
  SecurityVisitorOptions as OperationSecurityVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/SecurityVisitor.ts';
export type {
  default as OperationServersVisitor,
  ServersVisitorOptions as OperationServersVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/ServersVisitor.ts';
export type {
  default as OperationTagsVisitor,
  TagsVisitorOptions as OperationTagsVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/TagsVisitor.ts';
export type {
  default as ParameterContentVisitor,
  ContentVisitorOptions as ParameterContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter/ContentVisitor.ts';
export type {
  default as ParameterExampleVisitor,
  ExamplesVisitorOptions as ParameterExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter/ExamplesVisitor.ts';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter/index.ts';
export type {
  default as ParameterSchemaVisitor,
  SchemaVisitorOptions as ParameterSchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter/SchemaVisitor.ts';
export type {
  default as PathItem$RefVisitor,
  $RefVisitorOptions as PathItem$RefVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item/$RefVisitor.ts';
export type {
  default as PathItemVisitor,
  PathItemVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item/index.ts';
export type {
  default as PathItemParametersVisitor,
  ParametersVisitorOptions as PathItemParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item/ParametersVisitor.ts';
export type {
  default as PathItemServersVisitor,
  ServersVisitorOptions as PathItemServersVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item/ServersVisitor.ts';
export type {
  default as PathsVisitor,
  PathsVisitorOptions,
} from './refractor/visitors/open-api-3-0/paths/index.ts';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/open-api-3-0/reference/$RefVisitor.ts';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/open-api-3-0/reference/index.ts';
export type {
  default as RequestBodyContentVisitor,
  ContentVisitorOptions as RequestBodyContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/request-body/ContentVisitor.ts';
export type {
  default as RequestBodyVisitor,
  RequestBodyVisitorOptions,
} from './refractor/visitors/open-api-3-0/request-body/index.ts';
export type {
  default as ResponseContentVisitor,
  ContentVisitorOptions as ResponseContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/response/ContentVisitor.ts';
export type {
  default as ResponseHeadersVisitor,
  HeadersVisitorOptions as ResponseHeadersVisitorOptions,
} from './refractor/visitors/open-api-3-0/response/HeadersVisitor.ts';
export type {
  default as ResponseVisitor,
  ResponseVisitorOptions,
} from './refractor/visitors/open-api-3-0/response/index.ts';
export type {
  default as ResponseLinksVisitor,
  LinksVisitorOptions as ResponseLinksVisitorOptions,
} from './refractor/visitors/open-api-3-0/response/LinksVisitor.ts';
export type {
  default as ResponsesDefaultVisitor,
  DefaultVisitorOptions as ResponsesDefaultVisitorOptions,
} from './refractor/visitors/open-api-3-0/responses/DefaultVisitor.ts';
export type {
  default as ResponsesVisitor,
  ResponsesVisitorOptions,
} from './refractor/visitors/open-api-3-0/responses/index.ts';
export type {
  default as SchemaVisitor,
  SchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/index.ts';
export type {
  default as SchemaAllOfVisitor,
  AllOfVisitorOptions as SchemaAllOfVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/AllOfVisitor.ts';
export type {
  default as SchemaAnyOfVisitor,
  AnyOfVisitorOptions as SchemaAnyOfVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/AnyOfVisitor.ts';
export type {
  default as SchemaItemsVisitor,
  ItemsVisitorOptions as SchemaItemsVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/ItemsVisitor.ts';
export type {
  default as SchemaOneOfVisitor,
  OneOfVisitorOptions as SchemaOneOfVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/OneOfVisitor.ts';
export type {
  default as SchemaPropertiesVisitor,
  PropertiesVisitorOptions as SchemaPropertiesVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/PropertiesVisitor.ts';
export type {
  default as SchemaOrReferenceVisitor,
  SchemaOrReferenceVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/SchemaOrReferenceVisitor.ts';
export type {
  default as SchemaTypeVisitor,
  TypeVisitorOptions as SchemaTypeVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema/TypeVisitor.ts';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
} from './refractor/visitors/open-api-3-0/security-requirement/index.ts';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
} from './refractor/visitors/open-api-3-0/security-scheme/index.ts';
export type {
  default as ServerVisitor,
  ServerVisitorOptions,
} from './refractor/visitors/open-api-3-0/server/index.ts';
export type {
  default as ServerVariableUrlVisitor,
  UrlVisitorOptions as ServerVariableUrlVisitorOptions,
} from './refractor/visitors/open-api-3-0/server/UrlVisitor.ts';
export type {
  default as ServerVariableVariablesVisitor,
  VariablesVisitorOptions as ServerVariableVariablesVisitorOptions,
} from './refractor/visitors/open-api-3-0/server/VariablesVisitor.ts';
export type {
  default as ServerVariableVisitor,
  ServerVariableVisitorOptions,
} from './refractor/visitors/open-api-3-0/server-variable/index.ts';
export type {
  default as TagVisitor,
  TagVisitorOptions,
} from './refractor/visitors/open-api-3-0/tag/index.ts';
export type {
  default as XmlVisitor,
  XmlVisitorOptions,
} from './refractor/visitors/open-api-3-0/xml/index.ts';
export type {
  default as ContentVisitor,
  ContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/ContentVisitor.ts';
export type {
  default as ExamplesVisitor,
  ExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/ExamplesVisitor.ts';
export type {
  default as OpenApi3_0Visitor,
  OpenApi3_0VisitorOptions,
} from './refractor/visitors/open-api-3-0/index.ts';
export type {
  default as OpenapiVisitor,
  OpenapiVisitorOptions,
} from './refractor/visitors/open-api-3-0/OpenapiVisitor.ts';
export type {
  default as ParametersVisitor,
  ParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/ParametersVisitor.ts';
export type {
  default as SecurityVisitor,
  SecurityVisitorOptions,
} from './refractor/visitors/open-api-3-0/SecurityVisitor.ts';
export type {
  default as ServersVisitor,
  ServersVisitorOptions,
} from './refractor/visitors/open-api-3-0/ServersVisitor.ts';
export type {
  default as TagsVisitor,
  TagsVisitorOptions,
} from './refractor/visitors/open-api-3-0/TagsVisitor.ts';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

// OpenAPI 3.0.x elements
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
  LicenseElement,
  LinkElement,
  MediaTypeElement,
  OAuthFlowElement,
  OAuthFlowsElement,
  OpenapiElement,
  OpenApi3_0Element,
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
export { default as ComponentsCallbacksElement } from './elements/nces/ComponentsCallbacks.ts';
export { default as ComponentsExamplesElement } from './elements/nces/ComponentsExamples.ts';
export { default as ComponentsHeadersElement } from './elements/nces/ComponentsHeaders.ts';
export { default as ComponentsLinksElement } from './elements/nces/ComponentsLinks.ts';
export { default as ComponentsParametersElement } from './elements/nces/ComponentsParameters.ts';
export { default as ComponentsRequestBodiesElement } from './elements/nces/ComponentsRequestBodies.ts';
export { default as ComponentsResponsesElement } from './elements/nces/ComponentsResponses.ts';
export { default as ComponentsSchemasElement } from './elements/nces/ComponentsSchemas.ts';
export { default as ComponentsSecuritySchemesElement } from './elements/nces/ComponentsSecuritySchemes.ts';
export { default as DiscriminatorMappingElement } from './elements/nces/DiscriminatorMapping.ts';
export { default as EncodingHeadersElement } from './elements/nces/EncodingHeaders.ts';
export { default as HeaderContentElement } from './elements/nces/HeaderContent.ts';
export { default as HeaderExamplesElement } from './elements/nces/HeaderExamples.ts';
export { default as LinkParametersElement } from './elements/nces/LinkParameters.ts';
export { default as MediaTypeEncodingElement } from './elements/nces/MediaTypeEncoding.ts';
export { default as MediaTypeExamplesElement } from './elements/nces/MediaTypeExamples.ts';
export { default as OAuthFlowScopesElement } from './elements/nces/OAuthFlowScopes.ts';
export { default as OperationCallbacksElement } from './elements/nces/OperationCallbacks.ts';
export { default as OperationParametersElement } from './elements/nces/OperationParameters.ts';
export { default as OperationSecurityElement } from './elements/nces/OperationSecurity.ts';
export { default as OperationServersElement } from './elements/nces/OperationServers.ts';
export { default as OperationTagsElement } from './elements/nces/OperationTags.ts';
export { default as ParameterContentElement } from './elements/nces/ParameterContent.ts';
export { default as ParameterExamplesElement } from './elements/nces/ParameterExamples.ts';
export { default as PathItemParametersElement } from './elements/nces/PathItemParameters.ts';
export { default as PathItemServersElement } from './elements/nces/PathItemServers.ts';
export { default as RequestBodyContentElement } from './elements/nces/RequestBodyContent.ts';
export { default as ResponseContentElement } from './elements/nces/ResponseContent.ts';
export { default as ResponseHeadersElement } from './elements/nces/ResponseHeaders.ts';
export { default as ResponseLinksElement } from './elements/nces/ResponseLinks.ts';
export { default as SecurityElement } from './elements/nces/Security.ts';
export { default as ServersElement } from './elements/nces/Servers.ts';
export { default as ServerVariablesElement } from './elements/nces/ServerVariables.ts';
export { default as TagsElement } from './elements/nces/Tags.ts';
