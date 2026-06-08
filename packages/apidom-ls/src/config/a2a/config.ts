import { DiagnosticSeverity } from 'vscode-languageserver-types';

import a2a1Meta from './a2a1/meta.ts';
import agentCapabilitiesMeta from './agent-capabilities/meta.ts';
import agentSkillMeta from './agent-skill/meta.ts';
import agentProviderMeta from './agent-provider/meta.ts';
import agentInterfaceMeta from './agent-interface/meta.ts';
import securitySchemeMeta from './security-scheme/meta.ts';
import agentCardSignatureMeta from './agent-card-signature/meta.ts';
import oauthFlowsMeta from './oauth-flows/meta.ts';
import authorizationCodeOAuthFlowMeta from './authorization-code-oauth-flow/meta.ts';
import clientCredentialsOAuthFlowMeta from './client-credentials-oauth-flow/meta.ts';
import deviceCodeOAuthFlowMeta from './device-code-oauth-flow/meta.ts';
import implicitOAuthFlowMeta from './implicit-oauth-flow/meta.ts';
import passwordOAuthFlowMeta from './password-oauth-flow/meta.ts';
import agentExtensionMeta from './agent-extension/meta.ts';
import apiKeySecuritySchemeMeta from './api-key-security-scheme/meta.ts';
import httpAuthSecuritySchemeMeta from './http-auth-security-scheme/meta.ts';
import oauth2SecuritySchemeMeta from './oauth2-security-scheme/meta.ts';
import openIdConnectSecuritySchemeMeta from './open-id-connect-security-scheme/meta.ts';
import mutualTlsSecuritySchemeMeta from './mutual-tls-security-scheme/meta.ts';
import ApilintCodes from '../codes.ts';

export default {
  '*': {
    lint: [
      {
        code: ApilintCodes.DUPLICATE_KEYS,
        source: 'apilint',
        message: 'an object cannot contain duplicate keys',
        severity: DiagnosticSeverity.Error,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  a2aAgentCard1: a2a1Meta,
  agentCapabilities: agentCapabilitiesMeta,
  agentSkill: agentSkillMeta,
  agentProvider: agentProviderMeta,
  agentInterface: agentInterfaceMeta,
  securityScheme: securitySchemeMeta,
  agentCardSignature: agentCardSignatureMeta,
  oauthFlows: oauthFlowsMeta,
  authorizationCodeOAuthFlow: authorizationCodeOAuthFlowMeta,
  clientCredentialsOAuthFlow: clientCredentialsOAuthFlowMeta,
  deviceCodeOAuthFlow: deviceCodeOAuthFlowMeta,
  implicitOAuthFlow: implicitOAuthFlowMeta,
  passwordOAuthFlow: passwordOAuthFlowMeta,
  agentExtension: agentExtensionMeta,
  apiKeySecurityScheme: apiKeySecuritySchemeMeta,
  httpAuthSecurityScheme: httpAuthSecuritySchemeMeta,
  oauth2SecurityScheme: oauth2SecuritySchemeMeta,
  openIdConnectSecurityScheme: openIdConnectSecuritySchemeMeta,
  mutualTlsSecurityScheme: mutualTlsSecuritySchemeMeta,
};
