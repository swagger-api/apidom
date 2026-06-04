import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 AgentSkill fields.
 * See [AgentSkill](https://a2a-protocol.org/latest/specification/#agentskill).
 */
const documentation = [
  {
    target: 'id',
    docs: 'A unique identifier for the skill (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'name',
    docs: 'A human-readable name for the skill (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'description',
    docs: 'A detailed description of the skill (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'tags',
    docs: "Array of keywords describing the skill's capabilities (array of strings, required).",
    targetSpecs: A2A1,
  },
  {
    target: 'examples',
    docs: 'Example prompts or scenarios this skill can handle (array of strings).',
    targetSpecs: A2A1,
  },
  {
    target: 'inputModes',
    docs: "Supported input media types for this skill, overriding the agent's defaults (array of strings).",
    targetSpecs: A2A1,
  },
  {
    target: 'outputModes',
    docs: "Supported output media types for this skill, overriding the agent's defaults (array of strings).",
    targetSpecs: A2A1,
  },
  {
    target: 'securityRequirements',
    docs: 'Array of [Security Requirement Objects](https://a2a-protocol.org/latest/specification/#securityrequirement) necessary for this skill.',
    targetSpecs: A2A1,
  },
];

export default documentation;
