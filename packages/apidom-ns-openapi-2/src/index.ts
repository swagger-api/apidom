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
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor';
export { default as MixedFieldsVisitor } from './refractor/visitors/generics/MixedFieldsVisitor';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export { default as Visitor } from './refractor/visitors/Visitor';

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
