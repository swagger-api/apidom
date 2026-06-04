import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 SecurityScheme fields. SecurityScheme is a
 * discriminated union — exactly one of the subtype fields must be set.
 * See [SecurityScheme](https://a2a-protocol.org/latest/specification/#securityscheme).
 */
const documentation = [
  {
    target: 'apiKeySecurityScheme',
    docs: '[API Key Security Scheme](https://a2a-protocol.org/latest/specification/#apikeysecurityscheme) — API key-based authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'httpAuthSecurityScheme',
    docs: '[HTTP Auth Security Scheme](https://a2a-protocol.org/latest/specification/#httpauthsecurityscheme) — HTTP authentication (Basic, Bearer, etc.). Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'oauth2SecurityScheme',
    docs: '[OAuth2 Security Scheme](https://a2a-protocol.org/latest/specification/#oauth2securityscheme) — OAuth 2.0 authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'openIdConnectSecurityScheme',
    docs: '[OpenID Connect Security Scheme](https://a2a-protocol.org/latest/specification/#openidconnectsecurityscheme) — OpenID Connect authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
  {
    target: 'mtlsSecurityScheme',
    docs: '[Mutual TLS Security Scheme](https://a2a-protocol.org/latest/specification/#mutualtlssecurityscheme) — mutual TLS authentication. Set this OR exactly one other subtype.',
    targetSpecs: A2A1,
  },
];

export default documentation;
