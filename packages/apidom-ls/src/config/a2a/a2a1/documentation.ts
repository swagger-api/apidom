import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 AgentCard fields. Only fields whose type
 * isn't obvious from the value (objects, arrays of typed elements, maps) get
 * entries — primitive string/boolean fields are self-documenting via the
 * spec's element types.
 */
const documentation = [
  {
    target: 'provider',
    docs: '[Agent Provider Object](https://a2a-protocol.org/latest/definitions/#agent-provider) — the service provider of the agent (organization name and URL).',
    targetSpecs: A2A1,
  },
  {
    target: 'capabilities',
    docs: '[Agent Capabilities Object](https://a2a-protocol.org/latest/definitions/#agent-capabilities) — optional capabilities supported by the agent (streaming, push notifications, extensions, extended agent card).',
    targetSpecs: A2A1,
  },
  {
    target: 'supportedInterfaces',
    docs: 'Ordered list of [Agent Interface Objects](https://a2a-protocol.org/latest/definitions/#agent-interface). Each entry combines a URL, protocol binding (`JSONRPC`, `GRPC`, `HTTP+JSON`), and the A2A protocol version exposed at that endpoint. The first entry is preferred.',
    targetSpecs: A2A1,
  },
  {
    target: 'skills',
    docs: 'Array of [Agent Skill Objects](https://a2a-protocol.org/latest/definitions/#agent-skill) representing distinct capabilities the agent can perform.',
    targetSpecs: A2A1,
  },
  {
    target: 'securitySchemes',
    docs: 'Map of named [Security Scheme Objects](https://a2a-protocol.org/latest/definitions/#security-scheme). Each value is a wrapper with one of: `apiKeySecurityScheme`, `httpAuthSecurityScheme`, `oauth2SecurityScheme`, `openIdConnectSecurityScheme`, or `mtlsSecurityScheme`.',
    targetSpecs: A2A1,
  },
  {
    target: 'securityRequirements',
    docs: 'Array of [Security Requirement Objects](https://a2a-protocol.org/latest/definitions/#security-requirement) describing which security schemes clients must satisfy to contact the agent.',
    targetSpecs: A2A1,
  },
  {
    target: 'signatures',
    docs: 'Array of [Agent Card Signature Objects](https://a2a-protocol.org/latest/definitions/#agent-card-signature) — JSON Web Signatures (JWS, RFC 7515) computed for this Agent Card.',
    targetSpecs: A2A1,
  },
];

export default documentation;
