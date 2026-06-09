import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 OpenIdConnectSecurityScheme fields.
 * See [OpenIdConnectSecurityScheme](https://a2a-protocol.org/latest/specification/#455-openidconnectsecurityscheme).
 */
const documentation = [
  {
    target: 'description',
    docs: 'An optional description for the security scheme (string).',
    targetSpecs: A2A1,
  },
  {
    target: 'openIdConnectUrl',
    docs: "The OpenID Connect Discovery URL for the OIDC provider's metadata (string, required).",
    targetSpecs: A2A1,
  },
];

export default documentation;
