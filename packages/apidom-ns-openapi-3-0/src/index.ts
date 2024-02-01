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

export { default as refract, createRefractor } from './refractor';
export { default as createToolbox } from './refractor/toolbox';
export { default as specificationObj } from './refractor/specification';

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
  isServerElement,
  isServerVariableElement,
  isMediaTypeElement,
  isServersElement,
} from './predicates';

export {
  isReferenceLikeElement,
  isServerLikeElement,
  isTagLikeElement,
  isOpenApiExtension,
} from './refractor/predicates';

export { default as AlternatingVisitor } from './refractor/visitors/generics/AlternatingVisitor';
export type { AlternatingVisitorOptions } from './refractor/visitors/generics/AlternatingVisitor';
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor';
export { default as MixedFieldsVisitor } from './refractor/visitors/generics/MixedFieldsVisitor';
export type { MixedFieldsVisitorOptions } from './refractor/visitors/generics/MixedFieldsVisitor';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor';
export { default as SpecificationExtensionVisitor } from './refractor/visitors/SpecificationExtensionVisitor';
export type { SpecificationExtensionVisitorOptions } from './refractor/visitors/SpecificationExtensionVisitor';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor';
export { default as Visitor } from './refractor/visitors/Visitor';
export type { VisitorOptions } from './refractor/visitors/Visitor';

export type {
  default as CallbackVisitor,
  CallbackVisitorOptions,
} from './refractor/visitors/open-api-3-0/callback';
export type {
  default as ComponentsCallbacksVisitor,
  CallbackVisitorOptions as ComponentsCallbacksVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/CallbacksVisitor';
export type {
  default as ComponentsExamplesVisitor,
  ExamplesVisitorOptions as ComponentsExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/ExamplesVisitor';
export type {
  default as ComponentsHeadersVisitor,
  HeadersVisitorOptions as ComponentsHeadersVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/HeadersVisitor';
export type {
  default as ComponentsVisitor,
  ComponentsVisitorOptions,
} from './refractor/visitors/open-api-3-0/components';
export type {
  default as ComponentsLinksVisitor,
  LinksVisitorOptions as ComponentsLinksVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/LinksVisitor';
export type {
  default as ComponentsParametersVisitor,
  ParametersVisitorOptions as ComponentsParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/ParametersVisitor';
export type {
  default as ComponentsRequestBodiesVisitor,
  RequestBodiesVisitorOptions as ComponentsRequestBodiesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/RequestBodiesVisitor';
export type {
  default as ComponentsResponsesVisitor,
  ResponsesVisitorOptions as ComponentsResponsesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/ResponsesVisitor';
export type {
  default as ComponentsSchemasVisitor,
  SchemasVisitorOptions as ComponentsSchemasVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/SchemasVisitor';
export type {
  default as ComponentsSecuritySchemesVisitor,
  SecuritySchemesVisitorOptions as ComponentsSecuritySchemesVisitorOptions,
} from './refractor/visitors/open-api-3-0/components/SecuritySchemesVisitor';
export type {
  default as ContactVisitor,
  ContactVisitorOptions,
} from './refractor/visitors/open-api-3-0/contact';
export type {
  default as DiscriminatorVisitor,
  DiscriminatorVisitorOptions,
} from './refractor/visitors/open-api-3-0/distriminator';
export type {
  default as DiscriminatorMappingVisitor,
  MappingVisitorOptions as DiscriminatorMappingVisitorOptions,
} from './refractor/visitors/open-api-3-0/distriminator/MappingVisitor';
export type {
  default as EncodingHeadersVisitor,
  HeadersVisitorOptions as EncodingHeadersVisitorOptions,
} from './refractor/visitors/open-api-3-0/encoding/HeadersVisitor';
export type {
  default as EncodingVisitor,
  EncodingVisitorOptions,
} from './refractor/visitors/open-api-3-0/encoding';
export type {
  default as ExampleExternalValueVisitor,
  ExternalValueVisitorOptions as ExampleExternalValueVisitorOptions,
} from './refractor/visitors/open-api-3-0/example/ExternalValueVisitor';
export type {
  default as ExampleVisitor,
  ExampleVisitorOptions,
} from './refractor/visitors/open-api-3-0/example';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
} from './refractor/visitors/open-api-3-0/external-documentation';
export type {
  default as HeaderContentVisitor,
  ContentVisitorOptions as HeaderContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/header/ContentVisitor';
export type {
  default as HeaderExamplesVisitor,
  ExamplesVisitorOptions as HeaderExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/header/ExamplesVisitor';
export type {
  default as HeaderVisitor,
  HeaderVisitorOptions,
} from './refractor/visitors/open-api-3-0/header';
export type {
  default as HeaderSchemaVisitor,
  SchemaVisitorOptions as HeaderSchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/header/SchemaVisitor';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/open-api-3-0/info';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/open-api-3-0/info/VersionVisitor';
export type {
  default as LicenseVisitor,
  LicenseVisitorOptions,
} from './refractor/visitors/open-api-3-0/license';
export type {
  default as LinkVisitor,
  LinkVisitorOptions,
} from './refractor/visitors/open-api-3-0/link';
export type {
  default as LinkOperationIdVisitor,
  OperationIdVisitorOptions as LinkOperationIdVisitorOptions,
} from './refractor/visitors/open-api-3-0/link/OperationIdVisitor';
export type {
  default as LinkOperationRefVisitor,
  OperationRefVisitorOptions as LinkOperationRefVisitorOptions,
} from './refractor/visitors/open-api-3-0/link/OperationRefVisitor';
export type {
  default as LinkParametersVisitor,
  ParametersVisitorOptions as LinkParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/link/ParametersVisitor';
export type {
  default as MediaTypeEncodingVisitor,
  EncodingVisitorOptions as MediaTypeEncodingVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type/EncodingVisitor';
export type {
  default as MediaTypeExamplesVisitor,
  ExamplesVisitorOptions as MediaTypeExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type/ExamplesVisitor';
export type {
  default as MediaTypeVisitor,
  MediaTypeVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type';
export type {
  default as MediaTypeSchemaVisitor,
  SchemaVisitorOptions as MediaTypeSchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/media-type/SchemaVisitor';
export type {
  default as OAuthFlowVisitor,
  OAuthFlowVisitorOptions,
} from './refractor/visitors/open-api-3-0/oauth-flow';
export type {
  default as OAuthFlowScopesVisitor,
  ScopesVisitorOptions as OAuthFlowScopesVisitorOptions,
} from './refractor/visitors/open-api-3-0/oauth-flow/ScopesVisitor';
export type {
  default as OAuthFlowsVisitor,
  OAuthFlowsVisitorOptions,
} from './refractor/visitors/open-api-3-0/oauth-flows';
export type {
  default as OperationCallbacksVisitor,
  CallbacksVisitorOptions as OperationCallbacksVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/CallbacksVisitor';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation';
export type {
  default as OperationParametersVisitor,
  ParametersVisitorOptions as OperationParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/ParametersVisitor';
export type {
  default as OperationRequestBodyVisitor,
  RequestBodyVisitorOptions as OperationRequestBodyVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/RequestBodyVisitor';
export type {
  default as OperationSecurityVisitor,
  SecurityVisitorOptions as OperationSecurityVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/SecurityVisitor';
export type {
  default as OperationServersVisitor,
  ServersVisitorOptions as OperationServersVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/ServersVisitor';
export type {
  default as OperationTagsVisitor,
  TagsVisitorOptions as OperationTagsVisitorOptions,
} from './refractor/visitors/open-api-3-0/operation/TagsVisitor';
export type {
  default as ParameterContentVisitor,
  ContentVisitorOptions as ParameterContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter/ContentVisitor';
export type {
  default as ParameterExampleVisitor,
  ExamplesVisitorOptions as ParameterExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter/ExamplesVisitor';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter';
export type {
  default as ParameterSchemaVisitor,
  SchemaVisitorOptions as ParameterSchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/parameter/SchemaVisitor';
export type {
  default as PathItem$RefVisitor,
  $RefVisitorOptions as PathItem$RefVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item/$RefVisitor';
export type {
  default as PathItemVisitor,
  PathItemVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item';
export type {
  default as PathItemParametersVisitor,
  ParametersVisitorOptions as PathItemParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item/ParametersVisitor';
export type {
  default as PathItemServersVisitor,
  ServersVisitorOptions as PathItemServersVisitorOptions,
} from './refractor/visitors/open-api-3-0/path-item/ServersVisitor';
export type {
  default as PathsVisitor,
  PathsVisitorOptions,
} from './refractor/visitors/open-api-3-0/paths';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/open-api-3-0/reference/$RefVisitor';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/open-api-3-0/reference';
export type {
  default as RequestBodyContentVisitor,
  ContentVisitorOptions as RequestBodyContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/request-body/ContentVisitor';
export type {
  default as RequestBodyVisitor,
  RequestBodyVisitorOptions,
} from './refractor/visitors/open-api-3-0/request-body';
export type {
  default as ResponseContentVisitor,
  ContentVisitorOptions as ResponseContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/response/ContentVisitor';
export type {
  default as ResponseHeadersVisitor,
  HeadersVisitorOptions as ResponseHeadersVisitorOptions,
} from './refractor/visitors/open-api-3-0/response/HeadersVisitor';
export type {
  default as ResponseVisitor,
  ResponseVisitorOptions,
} from './refractor/visitors/open-api-3-0/response';
export type {
  default as ResponseLinksVisitor,
  LinksVisitorOptions as ResponseLinksVisitorOptions,
} from './refractor/visitors/open-api-3-0/response/LinksVisitor';
export type {
  default as ResponsesDefaultVisitor,
  DefaultVisitorOptions as ResponsesDefaultVisitorOptions,
} from './refractor/visitors/open-api-3-0/responses/DefaultVisitor';
export type {
  default as ResponsesVisitor,
  ResponsesVisitorOptions,
} from './refractor/visitors/open-api-3-0/responses';
export type {
  default as SchemaVisitor,
  SchemaVisitorOptions,
} from './refractor/visitors/open-api-3-0/schema';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
} from './refractor/visitors/open-api-3-0/security-requirement';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
} from './refractor/visitors/open-api-3-0/security-scheme';
export type {
  default as ServerVisitor,
  ServerVisitorOptions,
} from './refractor/visitors/open-api-3-0/server';
export type {
  default as ServerVariableUrlVisitor,
  UrlVisitorOptions as ServerVariableUrlVisitorOptions,
} from './refractor/visitors/open-api-3-0/server/UrlVisitor';
export type {
  default as ServerVariableVariablesVisitor,
  VariablesVisitorOptions as ServerVariableVariablesVisitorOptions,
} from './refractor/visitors/open-api-3-0/server/VariablesVisitor';
export type {
  default as ServerVariableVisitor,
  ServerVariableVisitorOptions,
} from './refractor/visitors/open-api-3-0/server-variable';
export type {
  default as TagVisitor,
  TagVisitorOptions,
} from './refractor/visitors/open-api-3-0/tag';
export type {
  default as XmlVisitor,
  XmlVisitorOptions,
} from './refractor/visitors/open-api-3-0/xml';
export type {
  default as ContentVisitor,
  ContentVisitorOptions,
} from './refractor/visitors/open-api-3-0/ContentVisitor';
export type {
  default as ExamplesVisitor,
  ExamplesVisitorOptions,
} from './refractor/visitors/open-api-3-0/ExamplesVisitor';
export type {
  default as OpenApi3_0Visitor,
  OpenApi3_0VisitorOptions,
} from './refractor/visitors/open-api-3-0';
export type {
  default as OpenapiVisitor,
  OpenapiVisitorOptions,
} from './refractor/visitors/open-api-3-0/OpenapiVisitor';
export type {
  default as ParametersVisitor,
  ParametersVisitorOptions,
} from './refractor/visitors/open-api-3-0/ParametersVisitor';
export type {
  default as SecurityVisitor,
  SecurityVisitorOptions,
} from './refractor/visitors/open-api-3-0/SecurityVisitor';
export type {
  default as ServersVisitor,
  ServersVisitorOptions,
} from './refractor/visitors/open-api-3-0/ServersVisitor';
export type {
  default as TagsVisitor,
  TagsVisitorOptions,
} from './refractor/visitors/open-api-3-0/TagsVisitor';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor';

export { keyMap, getNodeType } from './traversal/visitor';

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
} from './refractor/registration';
// NCE types
export { default as ComponentsCallbacksElement } from './elements/nces/ComponentsCallbacks';
export { default as ComponentsExamplesElement } from './elements/nces/ComponentsExamples';
export { default as ComponentsHeadersElement } from './elements/nces/ComponentsHeaders';
export { default as ComponentsLinksElement } from './elements/nces/ComponentsLinks';
export { default as ComponentsParametersElement } from './elements/nces/ComponentsParameters';
export { default as ComponentsRequestBodiesElement } from './elements/nces/ComponentsRequestBodies';
export { default as ComponentsResponsesElement } from './elements/nces/ComponentsResponses';
export { default as ComponentsSchemasElement } from './elements/nces/ComponentsSchemas';
export { default as ComponentsSecuritySchemesElement } from './elements/nces/ComponentsSecuritySchemes';
export { default as DiscriminatorMappingElement } from './elements/nces/DiscriminatorMapping';
export { default as EncodingHeadersElement } from './elements/nces/EncodingHeaders';
export { default as HeaderContentElement } from './elements/nces/HeaderContent';
export { default as HeaderExamplesElement } from './elements/nces/HeaderExamples';
export { default as LinkParametersElement } from './elements/nces/LinkParameters';
export { default as MediaTypeEncodingElement } from './elements/nces/MediaTypeEncoding';
export { default as MediaTypeExamplesElement } from './elements/nces/MediaTypeExamples';
export { default as OAuthFlowScopesElement } from './elements/nces/OAuthFlowScopes';
export { default as OperationCallbacksElement } from './elements/nces/OperationCallbacks';
export { default as OperationParametersElement } from './elements/nces/OperationParameters';
export { default as OperationSecurityElement } from './elements/nces/OperationSecurity';
export { default as OperationServersElement } from './elements/nces/OperationServers';
export { default as OperationTagsElement } from './elements/nces/OperationTags';
export { default as ParameterContentElement } from './elements/nces/ParameterContent';
export { default as ParameterExamplesElement } from './elements/nces/ParameterExamples';
export { default as PathItemParametersElement } from './elements/nces/PathItemParameters';
export { default as PathItemServersElement } from './elements/nces/PathItemServers';
export { default as RequestBodyContentElement } from './elements/nces/RequestBodyContent';
export { default as ResponseContentElement } from './elements/nces/ResponseContent';
export { default as ResponseHeadersElement } from './elements/nces/ResponseHeaders';
export { default as ResponseLinksElement } from './elements/nces/ResponseLinks';
export { default as SecurityElement } from './elements/nces/Security';
export { default as ServersElement } from './elements/nces/Servers';
export { default as ServerVariablesElement } from './elements/nces/ServerVariables';
export { default as TagsElement } from './elements/nces/Tags';
