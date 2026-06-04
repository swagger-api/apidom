import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 AgentInterface fields.
 * See [AgentInterface](https://a2a-protocol.org/latest/specification/#agentinterface).
 */
const documentation = [
  {
    target: 'url',
    docs: 'The URL where this interface is available (string, required). Must be a valid absolute HTTPS URL in production.',
    targetSpecs: A2A1,
  },
  {
    target: 'protocolBinding',
    docs: 'The protocol binding supported at this URL (string, required). Officially supported values: `JSONRPC`, `GRPC`, `HTTP+JSON`. Custom bindings SHOULD use a URI.',
    targetSpecs: A2A1,
  },
  {
    target: 'protocolVersion',
    docs: 'The version of the A2A protocol this interface exposes (string, required). Examples: `"0.3"`, `"1.0"`.',
    targetSpecs: A2A1,
  },
  {
    target: 'tenant',
    docs: 'Optional opaque routing identifier for a specific agent or tenant served behind a single A2A endpoint (string).',
    targetSpecs: A2A1,
  },
];

export default documentation;
