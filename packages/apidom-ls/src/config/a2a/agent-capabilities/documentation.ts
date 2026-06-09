import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 AgentCapabilities fields.
 * See [AgentCapabilities](https://a2a-protocol.org/latest/specification/#443-agentcapabilities).
 */
const documentation = [
  {
    target: 'streaming',
    docs: 'Indicates if the agent supports streaming responses (boolean).',
    targetSpecs: A2A1,
  },
  {
    target: 'pushNotifications',
    docs: 'Indicates if the agent supports sending push notifications for asynchronous task updates (boolean).',
    targetSpecs: A2A1,
  },
  {
    target: 'extensions',
    docs: 'Array of [Agent Extension Objects](https://a2a-protocol.org/latest/specification/#444-agentextension) — protocol extensions supported by the agent.',
    targetSpecs: A2A1,
  },
  {
    target: 'extendedAgentCard',
    docs: 'Indicates if the agent supports providing an extended agent card when authenticated (boolean).',
    targetSpecs: A2A1,
  },
];

export default documentation;
