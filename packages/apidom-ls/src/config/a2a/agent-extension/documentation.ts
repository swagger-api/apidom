import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 AgentExtension fields.
 * See [AgentExtension](https://a2a-protocol.org/latest/specification/#444-agentextension).
 */
const documentation = [
  {
    target: 'uri',
    docs: 'The unique URI identifying the extension (string).',
    targetSpecs: A2A1,
  },
  {
    target: 'description',
    docs: 'A human-readable description of how this agent uses the extension (string).',
    targetSpecs: A2A1,
  },
  {
    target: 'required',
    docs: "If true, the client must understand and comply with the extension's requirements (boolean).",
    targetSpecs: A2A1,
  },
  {
    target: 'params',
    docs: 'Optional extension-specific configuration parameters (object).',
    targetSpecs: A2A1,
  },
];

export default documentation;
