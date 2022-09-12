import './refractor/registration';

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
  isLinkElementExternal,
  isOpenapiElement,
  isOpenApi3_0Element,
  isOperationElement,
  isParameterElement,
  isPathItemElement,
  isPathItemElementExternal,
  isPathsElement,
  isReferenceElement,
  isReferenceElementExternal,
  isRequestBodyElement,
  isResponseElement,
  isResponsesElement,
  isSchemaElement,
  isBooleanJsonSchemaElement,
  isSecurityRequirementElement,
  isServerElement,
  isServerVariableElement,
  isMediaTypeElement,
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
export { default as CallbackElement } from './elements/Callback';
export { default as ComponentsElement } from './elements/Components';
export { default as ContactElement } from './elements/Contact';
export { default as DiscriminatorElement } from './elements/Discriminator';
export { default as EncodingElement } from './elements/Encoding';
export { default as ExampleElement } from './elements/Example';
export { default as ExternalDocumentationElement } from './elements/ExternalDocumentation';
export { default as HeaderElement } from './elements/Header';
export { default as InfoElement } from './elements/Info';
export { default as LicenseElement } from './elements/License';
export { default as LinkElement } from './elements/Link';
export { default as MediaTypeElement } from './elements/MediaType';
export { default as OAuthFlowElement } from './elements/OAuthFlow';
export { default as OAuthFlowsElement } from './elements/OAuthFlows';
export { default as OpenapiElement } from './elements/Openapi';
export { default as OpenApi3_0Element } from './elements/OpenApi3-0';
export { default as OperationElement } from './elements/Operation';
export { default as ParameterElement } from './elements/Parameter';
export { default as PathItemElement } from './elements/PathItem';
export { default as PathsElement } from './elements/Paths';
export { default as ReferenceElement } from './elements/Reference';
export { default as RequestBodyElement } from './elements/RequestBody';
export { default as ResponseElement } from './elements/Response';
export { default as ResponsesElement } from './elements/Responses';
export { default as SchemaElement } from './elements/Schema';
export { default as SecurityRequirementElement } from './elements/SecurityRequirement';
export { default as SecuritySchemeElement } from './elements/SecurityScheme';
export { default as ServerElement } from './elements/Server';
export { default as ServerVariableElement } from './elements/ServerVariable';
export { default as TagElement } from './elements/Tag';
export { default as XmlElement } from './elements/Xml';
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
