import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 HTTPAuthSecurityScheme fields.
 * See [HTTPAuthSecurityScheme](https://a2a-protocol.org/latest/specification/#453-httpauthsecurityscheme).
 */
const documentation = [
  {
    target: 'description',
    docs: 'An optional description for the security scheme (string).',
    targetSpecs: A2A1,
  },
  {
    target: 'scheme',
    docs: 'The name of the HTTP Authentication scheme to be used in the Authorization header, as defined in RFC 7235 (e.g. "Bearer") (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'bearerFormat',
    docs: 'A hint to the client to identify how the bearer token is formatted (e.g. "JWT") (string).',
    targetSpecs: A2A1,
  },
];

export default documentation;
