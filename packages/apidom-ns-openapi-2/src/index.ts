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
export {
  isJSONReferenceElement,
  isJSONReferenceLikeElement,
  JSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export { default as mediaTypes, OpenAPIMediaTypes } from './media-types';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element';

export { default as refract, createRefractor } from './refractor';
export { default as specificationObj } from './refractor/specification';

export {
  isSwaggerElement,
  isSwaggerVersionElement,
  isInfoElement,
  isContactElement,
  isLicenseElement,
  isPathsElement,
  isPathItemElement,
  isOperationElement,
  isExternalDocumentationElement,
  isParameterElement,
  isItemsElement,
  isResponsesElement,
  isResponseElement,
  isHeadersElement,
  isExampleElement,
  isHeaderElement,
  isTagElement,
  isReferenceElement,
  isSchemaElement,
  isXmlElement,
  isDefinitionsElement,
  isParametersDefinitionsElement,
  isResponsesDefinitionsElement,
  isSecurityDefinitionsElement,
  isSecuritySchemeElement,
  isScopesElement,
  isSecurityRequirementElement,
} from './predicates';

export { isReferenceLikeElement, isSwaggerExtension } from './refractor/predicates';

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
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor';
export { default as Visitor } from './refractor/visitors/Visitor';
export type { VisitorOptions } from './refractor/visitors/Visitor';

export type {
  default as ContactVisitor,
  ContactVisitorOptions,
} from './refractor/visitors/open-api-2/contact';
export type {
  default as DefinitionsVisitor,
  DefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/definitions';
export type {
  default as ExampleVisitor,
  ExampleVisitorOptions,
} from './refractor/visitors/open-api-2/example';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
} from './refractor/visitors/open-api-2/external-documentation';
export type {
  default as HeaderVisitor,
  HeaderVisitorOptions,
} from './refractor/visitors/open-api-2/header';
export type {
  default as HeadersVisitor,
  HeadersVisitorOptions,
} from './refractor/visitors/open-api-2/headers';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/open-api-2/info';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/open-api-2/info/VersionVisitor';
export type {
  default as ItemsVisitor,
  ItemsVisitorOptions,
} from './refractor/visitors/open-api-2/items';
export type {
  default as LicenseVisitor,
  LicenseVisitorOptions,
} from './refractor/visitors/open-api-2/license';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
} from './refractor/visitors/open-api-2/operation';
export type {
  default as OperationConsumesVisitor,
  ConsumesVisitorOptions as OperationConsumesVisitorOptions,
} from './refractor/visitors/open-api-2/operation/ConsumesVisitor';
export type {
  default as OperationParametersVisitor,
  ParametersVisitorOptions as OperationParametersVisitorOptions,
} from './refractor/visitors/open-api-2/operation/ParametersVisitor';
export type {
  default as OperationProducesVisitor,
  ProducesVisitorOptions as OperationProducesVisitorOptions,
} from './refractor/visitors/open-api-2/operation/ProducesVisitor';
export type {
  default as OperationSchemesVisitor,
  SchemesVisitorOptions as OperationSchemesVisitorOptions,
} from './refractor/visitors/open-api-2/operation/SchemesVisitor';
export type {
  default as OperationSecurityVisitor,
  SecurityVisitorOptions as OperationSecurityVisitorOptions,
} from './refractor/visitors/open-api-2/operation/SecurityVisitor';
export type {
  default as OperationTagsVisitor,
  TagsVisitorOptions as OperationTagsVisitorOptions,
} from './refractor/visitors/open-api-2/operation/TagsVisitor';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/open-api-2/parameter';
export type {
  default as ParametersDefinitionsVisitor,
  ParametersDefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/parameters-definitions';
export type {
  default as PathItemVisitor,
  PathItemVisitorOptions,
} from './refractor/visitors/open-api-2/path-item';
export type {
  default as PathItem$RefVisitor,
  $RefVisitorOptions as PathItem$RefVisitorOptions,
} from './refractor/visitors/open-api-2/path-item/$RefVisitor';
export type {
  default as PathItemParametersVisitor,
  ParametersVisitorOptions as PathItemParametersVisitorOptions,
} from './refractor/visitors/open-api-2/path-item/ParametersVisitor';
export type {
  default as PathsVisitor,
  PathsVisitorOptions,
} from './refractor/visitors/open-api-2/paths';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/open-api-2/reference';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/open-api-2/reference/$RefVisitor';
export type {
  default as ResponseVisitor,
  ResponseVisitorOptions,
} from './refractor/visitors/open-api-2/response';
export type {
  default as ResponsesVisitor,
  ResponsesVisitorOptions,
} from './refractor/visitors/open-api-2/responses';
export type {
  default as ResponsesDefaultVisitor,
  DefaultVisitorOptions as ResponsesDefaultVisitorOptions,
} from './refractor/visitors/open-api-2/responses/DefaultVisitor';
export type {
  default as ResponsesDefinitionsVisitor,
  ResponsesDefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/responses-definitions';
export type {
  default as SchemaVisitor,
  SchemaVisitorOptions,
} from './refractor/visitors/open-api-2/schema';
export type {
  default as ScopesVisitor,
  ScopesVisitorOptions,
} from './refractor/visitors/open-api-2/scopes';
export type {
  default as SecurityDefinitionsVisitor,
  SecurityDefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/security-definitions';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
} from './refractor/visitors/open-api-2/security-requirement';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
} from './refractor/visitors/open-api-2/security-scheme';
export type { default as TagVisitor, TagVisitorOptions } from './refractor/visitors/open-api-2/tag';
export type { default as XmlVisitor, XmlVisitorOptions } from './refractor/visitors/open-api-2/xml';
export type {
  default as SwaggerVisitor,
  SwaggerVisitorOptions,
} from './refractor/visitors/open-api-2';
export type {
  default as BasePathVisitor,
  BasePathVisitorOptions,
} from './refractor/visitors/open-api-2/BasePathVisitor';
export type {
  default as ConsumesVisitor,
  ConsumesVisitorOptions,
} from './refractor/visitors/open-api-2/ConsumesVisitor';
export type {
  default as HostVisitor,
  HostVisitorOptions,
} from './refractor/visitors/open-api-2/HostVisitor';
export type {
  default as ProducesVisitor,
  ProducesVisitorOptions,
} from './refractor/visitors/open-api-2/ProducesVisitor';
export type {
  default as SchemesVisitor,
  SchemesVisitorOptions,
} from './refractor/visitors/open-api-2/SchemesVisitor';
export type {
  default as SecurityVisitor,
  SecurityVisitorOptions,
} from './refractor/visitors/open-api-2/SecurityVisitor';
export type {
  default as SwaggerVersionVisitor,
  SwaggerVisitorOptions as SwaggerVersionVisitorOptions,
} from './refractor/visitors/open-api-2/SwaggerVisitor';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor';

export { keyMap, getNodeType } from './traversal/visitor';

// OpenAPI 2.0 elements
export {
  SwaggerElement,
  SwaggerVersionElement,
  InfoElement,
  ContactElement,
  LicenseElement,
  PathsElement,
  PathItemElement,
  OperationElement,
  ExternalDocumentationElement,
  ParameterElement,
  ItemsElement,
  ResponsesElement,
  ResponseElement,
  HeadersElement,
  ExampleElement,
  HeaderElement,
  TagElement,
  ReferenceElement,
  SchemaElement,
  XmlElement,
  DefinitionsElement,
  ParametersDefinitionsElement,
  ResponsesDefinitionsElement,
  SecurityDefinitionsElement,
  SecuritySchemeElement,
  ScopesElement,
  SecurityRequirementElement,
} from './refractor/registration';
// NCE types
export { default as OperationConsumesElement } from './elements/nces/OperationConsumes';
export { default as OperationParametersElement } from './elements/nces/OperationParameters';
export { default as OperationProducesElement } from './elements/nces/OperationProduces';
export { default as OperationSchemesElement } from './elements/nces/OperationSchemes';
export { default as OperationSecurityElement } from './elements/nces/OperationSecurity';
export { default as OperationTagsElement } from './elements/nces/OperationTags';
export { default as PathItemParametersElement } from './elements/nces/PathItemParameters';
export { default as SwaggerSchemesElement } from './elements/nces/SwaggerSchemes';
export { default as SwaggerConsumesElement } from './elements/nces/SwaggerConsumes';
export { default as SwaggerProducesElement } from './elements/nces/SwaggerProduces';
export { default as SwaggerSecurityElement } from './elements/nces/SwaggerSecurity';
export { default as SwaggerTagsElement } from './elements/nces/SwaggerTags';
