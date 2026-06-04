import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 DeviceCodeOAuthFlow fields (RFC 8628).
 * See [DeviceCodeOAuthFlow](https://a2a-protocol.org/latest/specification/#devicecodeoauthflow).
 */
const documentation = [
  {
    target: 'deviceAuthorizationUrl',
    docs: 'The device authorization endpoint URL (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'tokenUrl',
    docs: 'The token URL to be used for this flow (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'refreshUrl',
    docs: 'The URL to be used for obtaining refresh tokens (string).',
    targetSpecs: A2A1,
  },
  {
    target: 'scopes',
    docs: 'A map of scope name to description available for the OAuth2 security scheme (required).',
    targetSpecs: A2A1,
  },
];

export default documentation;
