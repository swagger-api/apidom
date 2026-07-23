import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 SecurityScheme fields. SecurityScheme is a
 * discriminated union — exactly one of the subtype fields must be set.
 * See [SecurityScheme](https://a2a-protocol.org/latest/specification/#451-securityscheme).
 */
const documentation = [
  {
    target: 'apiKeySecurityScheme',
    docs: '[API Key Security Scheme](https://a2a-protocol.org/latest/specification/#452-apikeysecurityscheme) — API key-based authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'httpAuthSecurityScheme',
    docs: '[HTTP Auth Security Scheme](https://a2a-protocol.org/latest/specification/#453-httpauthsecurityscheme) — HTTP authentication (Basic, Bearer, etc.). Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'oauth2SecurityScheme',
    docs: '[OAuth2 Security Scheme](https://a2a-protocol.org/latest/specification/#454-oauth2securityscheme) — OAuth 2.0 authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'openIdConnectSecurityScheme',
    docs: '[OpenID Connect Security Scheme](https://a2a-protocol.org/latest/specification/#455-openidconnectsecurityscheme) — OpenID Connect authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'mtlsSecurityScheme',
    docs: '[Mutual TLS Security Scheme](https://a2a-protocol.org/latest/specification/#456-mutualtlssecurityscheme) — mutual TLS authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
];

export default documentation;
