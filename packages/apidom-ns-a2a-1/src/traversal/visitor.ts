import { keyMap as keyMapBase, isElement, Element } from '@swagger-api/apidom-core';

/**
 * @public
 */
export const getNodeType = <T extends Element>(element: T): string | undefined => {
  if (!isElement(element)) {
    return undefined;
  }
  return `${element.element.charAt(0).toUpperCase() + element.element.slice(1)}Element`;
};

/**
 * A2A Protocol v1.0
 * @public
 */
export const keyMap = {
  AgentCardElement: ['content'],
  AgentCapabilitiesElement: ['content'],
  AgentExtensionElement: ['content'],
  AgentProviderElement: ['content'],
  AgentInterfaceElement: ['content'],
  AgentSkillElement: ['content'],
  AgentCardSignatureElement: ['content'],
  SecurityRequirementElement: ['content'],
  SecuritySchemeElement: ['content'],
  // Note: keyMap keys must match the output of getNodeType (above), which
  // upper-cases only the first character of `element.element`. For names that
  // begin with an acronym (API, HTTP, OAuth) this differs from the natural
  // PascalCase class name — keep the keyMap key matching getNodeType.
  ApiKeySecuritySchemeElement: ['content'],
  HttpAuthSecuritySchemeElement: ['content'],
  MutualTlsSecuritySchemeElement: ['content'],
  Oauth2SecuritySchemeElement: ['content'],
  OpenIdConnectSecuritySchemeElement: ['content'],
  OauthFlowsElement: ['content'],
  AuthorizationCodeOAuthFlowElement: ['content'],
  ClientCredentialsOAuthFlowElement: ['content'],
  DeviceCodeOAuthFlowElement: ['content'],
  ImplicitOAuthFlowElement: ['content'],
  PasswordOAuthFlowElement: ['content'],
  StringListElement: ['content'],
  ...keyMapBase,
};
