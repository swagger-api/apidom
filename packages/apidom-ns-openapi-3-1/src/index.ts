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
  isLinkElementExternal,
  isRequestBodyElement,
  isPathsElement,
} from './predicates';

export { isOpenApi3_1LikeElement } from './refractor/predicates';
export {
  isParameterLikeElement,
  isReferenceLikeElement,
  isResponseLikeElement,
  isOpenApiExtension,
  isServerLikeElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

export { keyMap, getNodeType } from './traversal/visitor';

export { default as CallbackElement } from './elements/Callback';
export { default as ComponentsElement } from './elements/Components';
export { default as ContactElement } from './elements/Contact';
export { default as DiscriminatorElement } from './elements/Discriminator';
export { default as EncodingElement } from './elements/Encoding';
export { default as ExampleElement } from './elements/Example';
export { default as ExternalDocumentationElement } from './elements/ExternalDocumentation';
export { default as HeaderElement } from './elements/Header';
export { default as InfoElement } from './elements/Info';
export { default as JsonSchemaDialectElement } from './elements/JsonSchemaDialect';
export { default as LicenseElement } from './elements/License';
export { default as LinkElement } from './elements/Link';
export { default as MediaTypeElement } from './elements/MediaType';
export { default as OAuthFlowElement } from './elements/OAuthFlow';
export { default as OAuthFlowsElement } from './elements/OAuthFlows';
export { default as OpenapiElement } from './elements/Openapi';
export { default as OpenApi3_1Element } from './elements/OpenApi3-1';
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
