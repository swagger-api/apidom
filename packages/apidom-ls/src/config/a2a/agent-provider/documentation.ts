import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 AgentProvider fields.
 * See [AgentProvider](https://a2a-protocol.org/latest/specification/#agentprovider).
 */
const documentation = [
  {
    target: 'organization',
    docs: 'The name of the agent provider\'s organization (string, required). Example: `"Google"`.',
    targetSpecs: A2A1,
  },
  {
    target: 'url',
    docs: "A URL for the agent provider's website or relevant documentation (string, required).",
    targetSpecs: A2A1,
  },
];

export default documentation;
