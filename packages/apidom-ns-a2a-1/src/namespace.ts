import { NamespacePluginOptions } from '@swagger-api/apidom-core';

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
import StringListElement from './elements/StringList.ts';

/**
 * @public
 */
const a2a1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('a2aAgentCard1', AgentCardElement);
    base.register('agentCapabilities', AgentCapabilitiesElement);
    base.register('agentExtension', AgentExtensionElement);
    base.register('agentProvider', AgentProviderElement);
    base.register('agentInterface', AgentInterfaceElement);
    base.register('agentSkill', AgentSkillElement);
    base.register('agentCardSignature', AgentCardSignatureElement);
    base.register('securityRequirement', SecurityRequirementElement);
    base.register('securityScheme', SecuritySchemeElement);
    base.register('apiKeySecurityScheme', APIKeySecuritySchemeElement);
    base.register('httpAuthSecurityScheme', HTTPAuthSecuritySchemeElement);
    base.register('mutualTlsSecurityScheme', MutualTlsSecuritySchemeElement);
    base.register('oauth2SecurityScheme', OAuth2SecuritySchemeElement);
    base.register('openIdConnectSecurityScheme', OpenIdConnectSecuritySchemeElement);
    base.register('oauthFlows', OAuthFlowsElement);
    base.register('authorizationCodeOAuthFlow', AuthorizationCodeOAuthFlowElement);
    base.register('clientCredentialsOAuthFlow', ClientCredentialsOAuthFlowElement);
    base.register('deviceCodeOAuthFlow', DeviceCodeOAuthFlowElement);
    base.register('stringList', StringListElement);

    return base;
  },
};

export default a2a1;
