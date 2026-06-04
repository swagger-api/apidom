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

export { default as mediaTypes, A2AMediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as specificationObj } from './refractor/specification.ts';
export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

// Generic visitor base classes
export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type {
  FixedFieldsVisitorOptions,
  SpecPath,
} from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor.ts';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor.ts';
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

// A2A v1 element visitors (per-element FixedFields visitors)
export type {
  default as AgentCardVisitor,
  AgentCardVisitorOptions,
} from './refractor/visitors/a2a-1/agent-card/index.ts';
export type {
  default as AgentCapabilitiesVisitor,
  AgentCapabilitiesVisitorOptions,
} from './refractor/visitors/a2a-1/agent-capabilities/index.ts';
export type {
  default as AgentExtensionVisitor,
  AgentExtensionVisitorOptions,
} from './refractor/visitors/a2a-1/agent-extension/index.ts';
export type {
  default as AgentProviderVisitor,
  AgentProviderVisitorOptions,
} from './refractor/visitors/a2a-1/agent-provider/index.ts';
export type {
  default as AgentInterfaceVisitor,
  AgentInterfaceVisitorOptions,
} from './refractor/visitors/a2a-1/agent-interface/index.ts';
export type {
  default as AgentSkillVisitor,
  AgentSkillVisitorOptions,
} from './refractor/visitors/a2a-1/agent-skill/index.ts';
export type {
  default as AgentCardSignatureVisitor,
  AgentCardSignatureVisitorOptions,
} from './refractor/visitors/a2a-1/agent-card-signature/index.ts';
export type {
  default as SecurityRequirementVisitor,
  SecurityRequirementVisitorOptions,
} from './refractor/visitors/a2a-1/security-requirement/index.ts';
export type {
  default as SecuritySchemeVisitor,
  SecuritySchemeVisitorOptions,
} from './refractor/visitors/a2a-1/security-scheme/index.ts';
export type {
  default as APIKeySecuritySchemeVisitor,
  APIKeySecuritySchemeVisitorOptions,
} from './refractor/visitors/a2a-1/api-key-security-scheme/index.ts';
export type {
  default as HTTPAuthSecuritySchemeVisitor,
  HTTPAuthSecuritySchemeVisitorOptions,
} from './refractor/visitors/a2a-1/http-auth-security-scheme/index.ts';
export type {
  default as MutualTlsSecuritySchemeVisitor,
  MutualTlsSecuritySchemeVisitorOptions,
} from './refractor/visitors/a2a-1/mutual-tls-security-scheme/index.ts';
export type {
  default as OAuth2SecuritySchemeVisitor,
  OAuth2SecuritySchemeVisitorOptions,
} from './refractor/visitors/a2a-1/oauth2-security-scheme/index.ts';
export type {
  default as OpenIdConnectSecuritySchemeVisitor,
  OpenIdConnectSecuritySchemeVisitorOptions,
} from './refractor/visitors/a2a-1/open-id-connect-security-scheme/index.ts';
export type {
  default as OAuthFlowsVisitor,
  OAuthFlowsVisitorOptions,
} from './refractor/visitors/a2a-1/oauth-flows/index.ts';
export type {
  default as AuthorizationCodeOAuthFlowVisitor,
  AuthorizationCodeOAuthFlowVisitorOptions,
} from './refractor/visitors/a2a-1/authorization-code-oauth-flow/index.ts';
export type {
  default as ClientCredentialsOAuthFlowVisitor,
  ClientCredentialsOAuthFlowVisitorOptions,
} from './refractor/visitors/a2a-1/client-credentials-oauth-flow/index.ts';
export type {
  default as DeviceCodeOAuthFlowVisitor,
  DeviceCodeOAuthFlowVisitorOptions,
} from './refractor/visitors/a2a-1/device-code-oauth-flow/index.ts';
export type {
  default as ImplicitOAuthFlowVisitor,
  ImplicitOAuthFlowVisitorOptions,
} from './refractor/visitors/a2a-1/implicit-oauth-flow/index.ts';
export type {
  default as PasswordOAuthFlowVisitor,
  PasswordOAuthFlowVisitorOptions,
} from './refractor/visitors/a2a-1/password-oauth-flow/index.ts';
export type {
  default as StringListVisitor,
  StringListVisitorOptions,
} from './refractor/visitors/a2a-1/string-list/index.ts';

// Array/Map visitors
export type {
  default as SkillsVisitor,
  SkillsVisitorOptions,
} from './refractor/visitors/a2a-1/SkillsVisitor.ts';
export type {
  default as SignaturesVisitor,
  SignaturesVisitorOptions,
} from './refractor/visitors/a2a-1/SignaturesVisitor.ts';
export type {
  default as SupportedInterfacesVisitor,
  SupportedInterfacesVisitorOptions,
} from './refractor/visitors/a2a-1/SupportedInterfacesVisitor.ts';
export type {
  default as SecurityRequirementsVisitor,
  SecurityRequirementsVisitorOptions,
} from './refractor/visitors/a2a-1/SecurityRequirementsVisitor.ts';
export type {
  default as ExtensionsVisitor,
  ExtensionsVisitorOptions,
} from './refractor/visitors/a2a-1/ExtensionsVisitor.ts';
export type {
  default as SecuritySchemesVisitor,
  SecuritySchemesVisitorOptions,
} from './refractor/visitors/a2a-1/SecuritySchemesVisitor.ts';
export type {
  default as SecurityRequirementSchemesVisitor,
  SecurityRequirementSchemesVisitorOptions,
} from './refractor/visitors/a2a-1/security-requirement/SchemesVisitor.ts';

// Predicates
export {
  isAgentCardElement,
  isAgentCapabilitiesElement,
  isAgentExtensionElement,
  isAgentProviderElement,
  isAgentInterfaceElement,
  isAgentSkillElement,
  isAgentCardSignatureElement,
  isSecurityRequirementElement,
  isSecuritySchemeElement,
  isAPIKeySecuritySchemeElement,
  isHTTPAuthSecuritySchemeElement,
  isMutualTlsSecuritySchemeElement,
  isOAuth2SecuritySchemeElement,
  isOpenIdConnectSecuritySchemeElement,
  isOAuthFlowsElement,
  isAuthorizationCodeOAuthFlowElement,
  isClientCredentialsOAuthFlowElement,
  isDeviceCodeOAuthFlowElement,
  isImplicitOAuthFlowElement,
  isPasswordOAuthFlowElement,
  isStringListElement,
  isSkillsElement,
  isSignaturesElement,
  isSupportedInterfacesElement,
  isSecurityRequirementsElement,
  isExtensionsElement,
  isSecuritySchemesElement,
} from './predicates.ts';

export { isA2ASpecificationExtension } from './refractor/predicates.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

// NCE element classes (Named Collection Elements: ArrayElement / ObjectElement
// subclasses with distinct CSS classes for typed predicates)
export { default as SkillsElement } from './elements/nces/Skills.ts';
export { default as SignaturesElement } from './elements/nces/Signatures.ts';
export { default as SupportedInterfacesElement } from './elements/nces/SupportedInterfaces.ts';
export { default as SecurityRequirementsElement } from './elements/nces/SecurityRequirements.ts';
export { default as ExtensionsElement } from './elements/nces/Extensions.ts';
export { default as SecuritySchemesElement } from './elements/nces/SecuritySchemes.ts';

// A2A v1 elements (with .refract attached via registration)
export {
  AgentCardElement,
  AgentCapabilitiesElement,
  AgentExtensionElement,
  AgentProviderElement,
  AgentInterfaceElement,
  AgentSkillElement,
  AgentCardSignatureElement,
  SecurityRequirementElement,
  SecuritySchemeElement,
  APIKeySecuritySchemeElement,
  HTTPAuthSecuritySchemeElement,
  MutualTlsSecuritySchemeElement,
  OAuth2SecuritySchemeElement,
  OpenIdConnectSecuritySchemeElement,
  OAuthFlowsElement,
  AuthorizationCodeOAuthFlowElement,
  ClientCredentialsOAuthFlowElement,
  DeviceCodeOAuthFlowElement,
  ImplicitOAuthFlowElement,
  PasswordOAuthFlowElement,
  StringListElement,
} from './refractor/registration.ts';
