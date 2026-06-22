import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 SecurityRequirement fields.
 * See [SecurityRequirement](https://a2a-protocol.org/latest/definitions/#security-requirement).
 */
const documentation = [
  {
    target: 'schemes',
    docs: "Map of security scheme names to arrays of required scopes. Each key is a security scheme name from the Agent Card's `securitySchemes`, and each value is a list of required OAuth2 scopes (or an empty list if not applicable).",
    targetSpecs: A2A1,
  },
];

export default documentation;
