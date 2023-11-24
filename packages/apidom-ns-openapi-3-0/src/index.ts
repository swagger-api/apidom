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
  isOpenApi3_0LikeElement,
  isParameterLikeElement,
  isReferenceLikeElement,
  isRequestBodyLikeElement,
  isResponseLikeElement,
  isServerLikeElement,
  isTagLikeElement,
  isOpenApiExtension,
} from './refractor/predicates';

export { default as AlternatingVisitor } from './refractor/visitors/generics/AlternatingVisitor';
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor';
export { default as MixedFieldsVisitor } from './refractor/visitors/generics/MixedFieldsVisitor';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export { default as Visitor } from './refractor/visitors/Visitor';

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
