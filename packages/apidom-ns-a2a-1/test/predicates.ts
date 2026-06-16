import { assert } from 'chai';

import {
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
} from '../src/index.ts';

interface PredicateCase {
  name: string;
  predicate: (e: unknown) => boolean;
  Cls: new () => unknown;
}

const cases: PredicateCase[] = [
  { name: 'isAgentCardElement', predicate: isAgentCardElement, Cls: AgentCardElement },
  {
    name: 'isAgentCapabilitiesElement',
    predicate: isAgentCapabilitiesElement,
    Cls: AgentCapabilitiesElement,
  },
  {
    name: 'isAgentExtensionElement',
    predicate: isAgentExtensionElement,
    Cls: AgentExtensionElement,
  },
  { name: 'isAgentProviderElement', predicate: isAgentProviderElement, Cls: AgentProviderElement },
  {
    name: 'isAgentInterfaceElement',
    predicate: isAgentInterfaceElement,
    Cls: AgentInterfaceElement,
  },
  { name: 'isAgentSkillElement', predicate: isAgentSkillElement, Cls: AgentSkillElement },
  {
    name: 'isAgentCardSignatureElement',
    predicate: isAgentCardSignatureElement,
    Cls: AgentCardSignatureElement,
  },
  {
    name: 'isSecurityRequirementElement',
    predicate: isSecurityRequirementElement,
    Cls: SecurityRequirementElement,
  },
  {
    name: 'isSecuritySchemeElement',
    predicate: isSecuritySchemeElement,
    Cls: SecuritySchemeElement,
  },
  {
    name: 'isAPIKeySecuritySchemeElement',
    predicate: isAPIKeySecuritySchemeElement,
    Cls: APIKeySecuritySchemeElement,
  },
  {
    name: 'isHTTPAuthSecuritySchemeElement',
    predicate: isHTTPAuthSecuritySchemeElement,
    Cls: HTTPAuthSecuritySchemeElement,
  },
  {
    name: 'isMutualTlsSecuritySchemeElement',
    predicate: isMutualTlsSecuritySchemeElement,
    Cls: MutualTlsSecuritySchemeElement,
  },
  {
    name: 'isOAuth2SecuritySchemeElement',
    predicate: isOAuth2SecuritySchemeElement,
    Cls: OAuth2SecuritySchemeElement,
  },
  {
    name: 'isOpenIdConnectSecuritySchemeElement',
    predicate: isOpenIdConnectSecuritySchemeElement,
    Cls: OpenIdConnectSecuritySchemeElement,
  },
  { name: 'isOAuthFlowsElement', predicate: isOAuthFlowsElement, Cls: OAuthFlowsElement },
  {
    name: 'isAuthorizationCodeOAuthFlowElement',
    predicate: isAuthorizationCodeOAuthFlowElement,
    Cls: AuthorizationCodeOAuthFlowElement,
  },
  {
    name: 'isClientCredentialsOAuthFlowElement',
    predicate: isClientCredentialsOAuthFlowElement,
    Cls: ClientCredentialsOAuthFlowElement,
  },
  {
    name: 'isDeviceCodeOAuthFlowElement',
    predicate: isDeviceCodeOAuthFlowElement,
    Cls: DeviceCodeOAuthFlowElement,
  },
  {
    name: 'isImplicitOAuthFlowElement',
    predicate: isImplicitOAuthFlowElement,
    Cls: ImplicitOAuthFlowElement,
  },
  {
    name: 'isPasswordOAuthFlowElement',
    predicate: isPasswordOAuthFlowElement,
    Cls: PasswordOAuthFlowElement,
  },
  { name: 'isStringListElement', predicate: isStringListElement, Cls: StringListElement },
];

describe('predicates', function () {
  cases.forEach(({ name, predicate, Cls }) => {
    context(name, function () {
      context(`given matching ${Cls.name} instance`, function () {
        specify('should return true', function () {
          assert.isTrue(predicate(new Cls()));
        });
      });

      context('given non-matching values', function () {
        specify('should return false for plain object', function () {
          assert.isFalse(predicate({}));
        });

        specify('should return false for null', function () {
          assert.isFalse(predicate(null));
        });

        specify('should return false for undefined', function () {
          assert.isFalse(predicate(undefined));
        });
      });
    });
  });
});
