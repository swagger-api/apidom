import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 OAuth2SecurityScheme fields.
 * See [OAuth2SecurityScheme](https://a2a-protocol.org/latest/specification/#454-oauth2securityscheme).
 */
const documentation = [
  {
    target: 'description',
    docs: 'An optional description for the security scheme (string).',
    targetSpecs: A2A1,
  },
  {
    target: 'flows',
    docs: 'An object containing configuration information for the supported OAuth 2.0 flows (required).',
    targetSpecs: A2A1,
  },
  {
    target: 'oauth2MetadataUrl',
    docs: 'URL to the OAuth2 authorization server metadata (RFC 8414). TLS is required (string).',
    targetSpecs: A2A1,
  },
];

export default documentation;
