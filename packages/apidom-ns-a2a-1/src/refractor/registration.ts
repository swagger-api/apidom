import AgentCardElement from '../elements/AgentCard.ts';
import AgentCapabilitiesElement from '../elements/AgentCapabilities.ts';
import AgentExtensionElement from '../elements/AgentExtension.ts';
import AgentProviderElement from '../elements/AgentProvider.ts';
import AgentInterfaceElement from '../elements/AgentInterface.ts';
import AgentSkillElement from '../elements/AgentSkill.ts';
import AgentCardSignatureElement from '../elements/AgentCardSignature.ts';
import SecurityRequirementElement from '../elements/SecurityRequirement.ts';
import SecuritySchemeElement from '../elements/SecurityScheme.ts';
import APIKeySecuritySchemeElement from '../elements/APIKeySecurityScheme.ts';
import HTTPAuthSecuritySchemeElement from '../elements/HTTPAuthSecurityScheme.ts';
import MutualTlsSecuritySchemeElement from '../elements/MutualTlsSecurityScheme.ts';
import OAuth2SecuritySchemeElement from '../elements/OAuth2SecurityScheme.ts';
import OpenIdConnectSecuritySchemeElement from '../elements/OpenIdConnectSecurityScheme.ts';
import OAuthFlowsElement from '../elements/OAuthFlows.ts';
import AuthorizationCodeOAuthFlowElement from '../elements/AuthorizationCodeOAuthFlow.ts';
import ClientCredentialsOAuthFlowElement from '../elements/ClientCredentialsOAuthFlow.ts';
import DeviceCodeOAuthFlowElement from '../elements/DeviceCodeOAuthFlow.ts';
import StringListElement from '../elements/StringList.ts';
import { createRefractor } from './index.ts';

AgentCardElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AgentCard',
  '$visitor',
]);
AgentCapabilitiesElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AgentCapabilities',
  '$visitor',
]);
AgentExtensionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AgentExtension',
  '$visitor',
]);
AgentProviderElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AgentProvider',
  '$visitor',
]);
AgentInterfaceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AgentInterface',
  '$visitor',
]);
AgentSkillElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AgentSkill',
  '$visitor',
]);
AgentCardSignatureElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AgentCardSignature',
  '$visitor',
]);
SecurityRequirementElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);
SecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityScheme',
  '$visitor',
]);
APIKeySecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'APIKeySecurityScheme',
  '$visitor',
]);
HTTPAuthSecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'HTTPAuthSecurityScheme',
  '$visitor',
]);
MutualTlsSecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MutualTlsSecurityScheme',
  '$visitor',
]);
OAuth2SecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OAuth2SecurityScheme',
  '$visitor',
]);
OpenIdConnectSecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OpenIdConnectSecurityScheme',
  '$visitor',
]);
OAuthFlowsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OAuthFlows',
  '$visitor',
]);
AuthorizationCodeOAuthFlowElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AuthorizationCodeOAuthFlow',
  '$visitor',
]);
ClientCredentialsOAuthFlowElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ClientCredentialsOAuthFlow',
  '$visitor',
]);
DeviceCodeOAuthFlowElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'DeviceCodeOAuthFlow',
  '$visitor',
]);
StringListElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'StringList',
  '$visitor',
]);

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
  StringListElement,
};
