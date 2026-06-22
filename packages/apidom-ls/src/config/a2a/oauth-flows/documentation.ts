import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 OAuthFlows fields. OAuthFlows must contain
 * exactly one of the flow configurations below.
 * See [OAuthFlows](https://a2a-protocol.org/latest/specification/#457-oauthflows).
 */
const documentation = [
  {
    target: 'authorizationCode',
    docs: '[Authorization Code OAuth Flow](https://a2a-protocol.org/latest/specification/#458-authorizationcodeoauthflow) — configuration for the OAuth Authorization Code flow.',
    targetSpecs: A2A1,
  },
  {
    target: 'clientCredentials',
    docs: '[Client Credentials OAuth Flow](https://a2a-protocol.org/latest/specification/#459-clientcredentialsoauthflow) — configuration for the OAuth Client Credentials flow.',
    targetSpecs: A2A1,
  },
  {
    target: 'deviceCode',
    docs: '[Device Code OAuth Flow](https://a2a-protocol.org/latest/specification/#4510-devicecodeoauthflow) — configuration for the OAuth Device Code flow (RFC 8628).',
    targetSpecs: A2A1,
  },
];

export default documentation;
