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
  isLinkElement,
  isLinkElementExternal,
  isOpenapiElement,
  isOpenApi3_1Element,
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
  isMediaTypeElement,
} from './predicates';
export {
  isServerElement,
  isSecurityRequirementElement,
  isExternalDocumentationElement,
  isServerVariableElement,
  isServerLikeElement,
  isContactElement,
  isExampleElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

export {
  isOpenApi3_1LikeElement,
  isParameterLikeElement,
  isReferenceLikeElement,
  isRequestBodyLikeElement,
  isResponseLikeElement,
  isOpenApiExtension,
} from './refractor/predicates';

export { keyMap, getNodeType } from './traversal/visitor';

export { default as CallbackElement } from './elements/Callback';
export { default as ComponentsElement } from './elements/Components';
export { ContactElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { DiscriminatorElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { default as EncodingElement } from './elements/Encoding';
export { ExampleElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { ExternalDocumentationElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { default as HeaderElement } from './elements/Header';
export { default as InfoElement } from './elements/Info';
export { default as JsonSchemaDialectElement } from './elements/JsonSchemaDialect';
export { default as LicenseElement } from './elements/License';
export { default as LinkElement } from './elements/Link';
export { default as MediaTypeElement } from './elements/MediaType';
export { OAuthFlowElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { OAuthFlowsElement } from '@swagger-api/apidom-ns-openapi-3-0';
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
export { SecurityRequirementElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { SecuritySchemeElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { ServerElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { ServerVariableElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { TagElement } from '@swagger-api/apidom-ns-openapi-3-0';
export { XmlElement } from '@swagger-api/apidom-ns-openapi-3-0';
