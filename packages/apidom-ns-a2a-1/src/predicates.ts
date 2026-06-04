import { createPredicate } from '@swagger-api/apidom-core';

import AgentCardElement from './elements/AgentCard.ts';
import AgentCapabilitiesElement from './elements/AgentCapabilities.ts';
import AgentExtensionElement from './elements/AgentExtension.ts';
import AgentProviderElement from './elements/AgentProvider.ts';
import AgentInterfaceElement from './elements/AgentInterface.ts';
import AgentSkillElement from './elements/AgentSkill.ts';
import AgentCardSignatureElement from './elements/AgentCardSignature.ts';
import SecurityRequirementElement from './elements/SecurityRequirement.ts';
import SecuritySchemeElement from './elements/SecurityScheme.ts';
import APIKeySecuritySchemeElement from './elements/APIKeySecurityScheme.ts';
import HTTPAuthSecuritySchemeElement from './elements/HTTPAuthSecurityScheme.ts';
import MutualTlsSecuritySchemeElement from './elements/MutualTlsSecurityScheme.ts';
import OAuth2SecuritySchemeElement from './elements/OAuth2SecurityScheme.ts';
import OpenIdConnectSecuritySchemeElement from './elements/OpenIdConnectSecurityScheme.ts';
import OAuthFlowsElement from './elements/OAuthFlows.ts';
import AuthorizationCodeOAuthFlowElement from './elements/AuthorizationCodeOAuthFlow.ts';
import ClientCredentialsOAuthFlowElement from './elements/ClientCredentialsOAuthFlow.ts';
import DeviceCodeOAuthFlowElement from './elements/DeviceCodeOAuthFlow.ts';
import ImplicitOAuthFlowElement from './elements/ImplicitOAuthFlow.ts';
import PasswordOAuthFlowElement from './elements/PasswordOAuthFlow.ts';
import StringListElement from './elements/StringList.ts';
import SkillsElement from './elements/nces/Skills.ts';
import SignaturesElement from './elements/nces/Signatures.ts';
import SupportedInterfacesElement from './elements/nces/SupportedInterfaces.ts';
import SecurityRequirementsElement from './elements/nces/SecurityRequirements.ts';
import ExtensionsElement from './elements/nces/Extensions.ts';
import SecuritySchemesElement from './elements/nces/SecuritySchemes.ts';

/**
 * @public
 */
export const isAgentCardElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AgentCardElement =>
      element instanceof AgentCardElement ||
      (hasBasicElementProps(element) &&
        isElementType('a2aAgentCard1', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element) &&
        hasClass('agent-card', element));
  },
);

/**
 * @public
 */
export const isAgentCapabilitiesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AgentCapabilitiesElement =>
      element instanceof AgentCapabilitiesElement ||
      (hasBasicElementProps(element) &&
        isElementType('agentCapabilities', element) &&
        primitiveEq('object', element) &&
        hasClass('agent-capabilities', element));
  },
);

/**
 * @public
 */
export const isAgentExtensionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AgentExtensionElement =>
      element instanceof AgentExtensionElement ||
      (hasBasicElementProps(element) &&
        isElementType('agentExtension', element) &&
        primitiveEq('object', element) &&
        hasClass('agent-extension', element));
  },
);

/**
 * @public
 */
export const isAgentProviderElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AgentProviderElement =>
      element instanceof AgentProviderElement ||
      (hasBasicElementProps(element) &&
        isElementType('agentProvider', element) &&
        primitiveEq('object', element) &&
        hasClass('agent-provider', element));
  },
);

/**
 * @public
 */
export const isAgentInterfaceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AgentInterfaceElement =>
      element instanceof AgentInterfaceElement ||
      (hasBasicElementProps(element) &&
        isElementType('agentInterface', element) &&
        primitiveEq('object', element) &&
        hasClass('agent-interface', element));
  },
);

/**
 * @public
 */
export const isAgentSkillElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AgentSkillElement =>
      element instanceof AgentSkillElement ||
      (hasBasicElementProps(element) &&
        isElementType('agentSkill', element) &&
        primitiveEq('object', element) &&
        hasClass('agent-skill', element));
  },
);

/**
 * @public
 */
export const isAgentCardSignatureElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AgentCardSignatureElement =>
      element instanceof AgentCardSignatureElement ||
      (hasBasicElementProps(element) &&
        isElementType('agentCardSignature', element) &&
        primitiveEq('object', element) &&
        hasClass('agent-card-signature', element));
  },
);

/**
 * @public
 */
export const isSecurityRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SecurityRequirementElement =>
      element instanceof SecurityRequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityRequirement', element) &&
        primitiveEq('object', element) &&
        hasClass('security-requirement', element));
  },
);

/**
 * @public
 */
export const isSecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SecuritySchemeElement =>
      element instanceof SecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityScheme', element) &&
        primitiveEq('object', element) &&
        hasClass('security-scheme', element));
  },
);

/**
 * @public
 */
export const isAPIKeySecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is APIKeySecuritySchemeElement =>
      element instanceof APIKeySecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('apiKeySecurityScheme', element) &&
        primitiveEq('object', element) &&
        hasClass('api-key-security-scheme', element));
  },
);

/**
 * @public
 */
export const isHTTPAuthSecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is HTTPAuthSecuritySchemeElement =>
      element instanceof HTTPAuthSecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('httpAuthSecurityScheme', element) &&
        primitiveEq('object', element) &&
        hasClass('http-auth-security-scheme', element));
  },
);

/**
 * @public
 */
export const isMutualTlsSecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is MutualTlsSecuritySchemeElement =>
      element instanceof MutualTlsSecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('mutualTlsSecurityScheme', element) &&
        primitiveEq('object', element) &&
        hasClass('mutual-tls-security-scheme', element));
  },
);

/**
 * @public
 */
export const isOAuth2SecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is OAuth2SecuritySchemeElement =>
      element instanceof OAuth2SecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('oauth2SecurityScheme', element) &&
        primitiveEq('object', element) &&
        hasClass('oauth2-security-scheme', element));
  },
);

/**
 * @public
 */
export const isOpenIdConnectSecuritySchemeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is OpenIdConnectSecuritySchemeElement =>
      element instanceof OpenIdConnectSecuritySchemeElement ||
      (hasBasicElementProps(element) &&
        isElementType('openIdConnectSecurityScheme', element) &&
        primitiveEq('object', element) &&
        hasClass('open-id-connect-security-scheme', element));
  },
);

/**
 * @public
 */
export const isOAuthFlowsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is OAuthFlowsElement =>
      element instanceof OAuthFlowsElement ||
      (hasBasicElementProps(element) &&
        isElementType('oauthFlows', element) &&
        primitiveEq('object', element) &&
        hasClass('oauth-flows', element));
  },
);

/**
 * @public
 */
export const isAuthorizationCodeOAuthFlowElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is AuthorizationCodeOAuthFlowElement =>
      element instanceof AuthorizationCodeOAuthFlowElement ||
      (hasBasicElementProps(element) &&
        isElementType('authorizationCodeOAuthFlow', element) &&
        primitiveEq('object', element) &&
        hasClass('authorization-code-oauth-flow', element));
  },
);

/**
 * @public
 */
export const isClientCredentialsOAuthFlowElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is ClientCredentialsOAuthFlowElement =>
      element instanceof ClientCredentialsOAuthFlowElement ||
      (hasBasicElementProps(element) &&
        isElementType('clientCredentialsOAuthFlow', element) &&
        primitiveEq('object', element) &&
        hasClass('client-credentials-oauth-flow', element));
  },
);

/**
 * @public
 */
export const isDeviceCodeOAuthFlowElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is DeviceCodeOAuthFlowElement =>
      element instanceof DeviceCodeOAuthFlowElement ||
      (hasBasicElementProps(element) &&
        isElementType('deviceCodeOAuthFlow', element) &&
        primitiveEq('object', element) &&
        hasClass('device-code-oauth-flow', element));
  },
);

/**
 * @public
 */
export const isImplicitOAuthFlowElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is ImplicitOAuthFlowElement =>
      element instanceof ImplicitOAuthFlowElement ||
      (hasBasicElementProps(element) &&
        isElementType('implicitOAuthFlow', element) &&
        primitiveEq('object', element) &&
        hasClass('implicit-oauth-flow', element));
  },
);

/**
 * @public
 */
export const isPasswordOAuthFlowElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is PasswordOAuthFlowElement =>
      element instanceof PasswordOAuthFlowElement ||
      (hasBasicElementProps(element) &&
        isElementType('passwordOAuthFlow', element) &&
        primitiveEq('object', element) &&
        hasClass('password-oauth-flow', element));
  },
);

/**
 * @public
 */
export const isStringListElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StringListElement =>
      element instanceof StringListElement ||
      (hasBasicElementProps(element) &&
        isElementType('stringList', element) &&
        primitiveEq('object', element) &&
        hasClass('string-list', element));
  },
);

/**
 * @public
 */
export const isSkillsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SkillsElement =>
      element instanceof SkillsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('skills', element));
  },
);

/**
 * @public
 */
export const isSignaturesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SignaturesElement =>
      element instanceof SignaturesElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('signatures', element));
  },
);

/**
 * @public
 */
export const isSupportedInterfacesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SupportedInterfacesElement =>
      element instanceof SupportedInterfacesElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('supported-interfaces', element));
  },
);

/**
 * @public
 */
export const isSecurityRequirementsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SecurityRequirementsElement =>
      element instanceof SecurityRequirementsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('security-requirements', element));
  },
);

/**
 * @public
 */
export const isExtensionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is ExtensionsElement =>
      element instanceof ExtensionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('extensions', element));
  },
);

/**
 * @public
 */
export const isSecuritySchemesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SecuritySchemesElement =>
      element instanceof SecuritySchemesElement ||
      (hasBasicElementProps(element) &&
        isElementType('object', element) &&
        primitiveEq('object', element) &&
        hasClass('security-schemes', element));
  },
);
