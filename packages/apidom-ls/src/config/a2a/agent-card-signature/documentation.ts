import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 AgentCardSignature fields (RFC 7515 JWS).
 * See [AgentCardSignature](https://a2a-protocol.org/latest/specification/#agentcardsignature).
 */
const documentation = [
  {
    target: 'protected',
    docs: 'The protected JWS header for the signature (string, required). A base64url-encoded JSON object.',
    targetSpecs: A2A1,
  },
  {
    target: 'signature',
    docs: 'The computed signature, base64url-encoded (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'header',
    docs: 'The unprotected JWS header values (object).',
    targetSpecs: A2A1,
  },
];

export default documentation;
