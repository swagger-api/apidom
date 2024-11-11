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

export { default as mediaTypes, OpenAPIMediaTypes } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as specificationObj } from './refractor/specification.ts';

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
} from './predicates.ts';

export { isReferenceLikeElement, isSwaggerExtension } from './refractor/predicates.ts';

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
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor.ts';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor.ts';
export { default as Visitor } from './refractor/visitors/Visitor.ts';
export type { VisitorOptions } from './refractor/visitors/Visitor.ts';

export type {
  default as ContactVisitor,
  ContactVisitorOptions,
} from './refractor/visitors/open-api-2/contact/index.ts';
export type {
  default as DefinitionsVisitor,
  DefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/definitions/index.ts';
export type {
  default as ExampleVisitor,
  ExampleVisitorOptions,
} from './refractor/visitors/open-api-2/example/index.ts';
export type {
  default as ExternalDocumentationVisitor,
  ExternalDocumentationVisitorOptions,
} from './refractor/visitors/open-api-2/external-documentation/index.ts';
export type {
  default as HeaderVisitor,
  HeaderVisitorOptions,
} from './refractor/visitors/open-api-2/header/index.ts';
export type {
  default as HeadersVisitor,
  HeadersVisitorOptions,
} from './refractor/visitors/open-api-2/headers/index.ts';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/open-api-2/info/index.ts';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/open-api-2/info/VersionVisitor.ts';
export type {
  default as ItemsVisitor,
  ItemsVisitorOptions,
} from './refractor/visitors/open-api-2/items/index.ts';
export type {
  default as LicenseVisitor,
  LicenseVisitorOptions,
} from './refractor/visitors/open-api-2/license/index.ts';
export type {
  default as OperationVisitor,
  OperationVisitorOptions,
} from './refractor/visitors/open-api-2/operation/index.ts';
export type {
  default as OperationConsumesVisitor,
  ConsumesVisitorOptions as OperationConsumesVisitorOptions,
} from './refractor/visitors/open-api-2/operation/ConsumesVisitor.ts';
export type {
  default as OperationParametersVisitor,
  ParametersVisitorOptions as OperationParametersVisitorOptions,
} from './refractor/visitors/open-api-2/operation/ParametersVisitor.ts';
export type {
  default as OperationProducesVisitor,
  ProducesVisitorOptions as OperationProducesVisitorOptions,
} from './refractor/visitors/open-api-2/operation/ProducesVisitor.ts';
export type {
  default as OperationSchemesVisitor,
  SchemesVisitorOptions as OperationSchemesVisitorOptions,
} from './refractor/visitors/open-api-2/operation/SchemesVisitor.ts';
export type {
  default as OperationSecurityVisitor,
  SecurityVisitorOptions as OperationSecurityVisitorOptions,
} from './refractor/visitors/open-api-2/operation/SecurityVisitor.ts';
export type {
  default as OperationTagsVisitor,
  TagsVisitorOptions as OperationTagsVisitorOptions,
} from './refractor/visitors/open-api-2/operation/TagsVisitor.ts';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/open-api-2/parameter/index.ts';
export type {
  default as ParametersDefinitionsVisitor,
  ParametersDefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/parameters-definitions/index.ts';
export type {
  default as PathItemVisitor,
  PathItemVisitorOptions,
} from './refractor/visitors/open-api-2/path-item/index.ts';
export type {
  default as PathItem$RefVisitor,
  $RefVisitorOptions as PathItem$RefVisitorOptions,
} from './refractor/visitors/open-api-2/path-item/$RefVisitor.ts';
export type {
  default as PathItemParametersVisitor,
  ParametersVisitorOptions as PathItemParametersVisitorOptions,
} from './refractor/visitors/open-api-2/path-item/ParametersVisitor.ts';
export type {
  default as PathsVisitor,
  PathsVisitorOptions,
} from './refractor/visitors/open-api-2/paths/index.ts';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/open-api-2/reference/index.ts';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/open-api-2/reference/$RefVisitor.ts';
export type {
  default as ResponseVisitor,
  ResponseVisitorOptions,
} from './refractor/visitors/open-api-2/response/index.ts';
export type {
  default as ResponsesVisitor,
  ResponsesVisitorOptions,
} from './refractor/visitors/open-api-2/responses/index.ts';
export type {
  default as ResponsesDefaultVisitor,
  DefaultVisitorOptions as ResponsesDefaultVisitorOptions,
} from './refractor/visitors/open-api-2/responses/DefaultVisitor.ts';
export type {
  default as ResponsesDefinitionsVisitor,
  ResponsesDefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/responses-definitions/index.ts';
export type {
  default as SchemaVisitor,
  SchemaVisitorOptions,
} from './refractor/visitors/open-api-2/schema/index.ts';
export type {
  default as SchemaAllOfVisitor,
  AllOfVisitorOptions as SchemaAllOfVisitorOptions,
} from './refractor/visitors/open-api-2/schema/AllOfVisitor.ts';
export type {
  default as SchemaItemsVisitor,
  ItemsVisitorOptions as SchemaItemsVisitorOptions,
} from './refractor/visitors/open-api-2/schema/ItemsVisitor.ts';
export type {
  default as SchemaPropertiesVisitor,
  PropertiesVisitorOptions as SchemaPropertiesVisitorOptions,
} from './refractor/visitors/open-api-2/schema/PropertiesVisitor.ts';
export type {
  default as SchemaOrJSONReferenceVisitor,
  SchemaOrReferenceVisitorOptions as SchemaOrJSONReferenceVisitorOptions,
} from './refractor/visitors/open-api-2/schema/SchemaOrJSONReferenceVisitor.ts';
export type {
  default as ScopesVisitor,
  ScopesVisitorOptions,
} from './refractor/visitors/open-api-2/scopes/index.ts';
export type {
  default as SecurityDefinitionsVisitor,
  SecurityDefinitionsVisitorOptions,
} from './refractor/visitors/open-api-2/security-definitions/index.ts';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
} from './refractor/visitors/open-api-2/security-requirement/index.ts';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
} from './refractor/visitors/open-api-2/security-scheme/index.ts';
export type {
  default as TagVisitor,
  TagVisitorOptions,
} from './refractor/visitors/open-api-2/tag/index.ts';
export type {
  default as XmlVisitor,
  XmlVisitorOptions,
} from './refractor/visitors/open-api-2/xml/index.ts';
export type {
  default as SwaggerVisitor,
  SwaggerVisitorOptions,
} from './refractor/visitors/open-api-2/index.ts';
export type {
  default as BasePathVisitor,
  BasePathVisitorOptions,
} from './refractor/visitors/open-api-2/BasePathVisitor.ts';
export type {
  default as ConsumesVisitor,
  ConsumesVisitorOptions,
} from './refractor/visitors/open-api-2/ConsumesVisitor.ts';
export type {
  default as HostVisitor,
  HostVisitorOptions,
} from './refractor/visitors/open-api-2/HostVisitor.ts';
export type {
  default as ProducesVisitor,
  ProducesVisitorOptions,
} from './refractor/visitors/open-api-2/ProducesVisitor.ts';
export type {
  default as SchemesVisitor,
  SchemesVisitorOptions,
} from './refractor/visitors/open-api-2/SchemesVisitor.ts';
export type {
  default as SecurityVisitor,
  SecurityVisitorOptions,
} from './refractor/visitors/open-api-2/SecurityVisitor.ts';
export type {
  default as SwaggerVersionVisitor,
  SwaggerVisitorOptions as SwaggerVersionVisitorOptions,
} from './refractor/visitors/open-api-2/SwaggerVisitor.ts';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

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
} from './refractor/registration.ts';
// NCE types
export { default as OperationConsumesElement } from './elements/nces/OperationConsumes.ts';
export { default as OperationParametersElement } from './elements/nces/OperationParameters.ts';
export { default as OperationProducesElement } from './elements/nces/OperationProduces.ts';
export { default as OperationSchemesElement } from './elements/nces/OperationSchemes.ts';
export { default as OperationSecurityElement } from './elements/nces/OperationSecurity.ts';
export { default as OperationTagsElement } from './elements/nces/OperationTags.ts';
export { default as PathItemParametersElement } from './elements/nces/PathItemParameters.ts';
export { default as SwaggerSchemesElement } from './elements/nces/SwaggerSchemes.ts';
export { default as SwaggerConsumesElement } from './elements/nces/SwaggerConsumes.ts';
export { default as SwaggerProducesElement } from './elements/nces/SwaggerProduces.ts';
export { default as SwaggerSecurityElement } from './elements/nces/SwaggerSecurity.ts';
export { default as SwaggerTagsElement } from './elements/nces/SwaggerTags.ts';
