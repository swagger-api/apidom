import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'name',
    insertText: 'name',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Agent Card name](https://a2a-protocol.org/latest/definitions/#agent-card)\n\\\n\\\nA human-readable name for the agent. Example: `"Recipe Agent"`.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A human-readable description of the agent, helping users and other agents understand its purpose.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'version',
    insertText: 'version',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The agent\'s deployment version. Example: `"1.0.0"`.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'iconUrl',
    insertText: 'iconUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Optional URL to an icon for the agent.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'documentationUrl',
    insertText: 'documentationUrl',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A URL providing additional documentation about the agent.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'provider',
    insertText: 'provider',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Agent Provider Object](https://a2a-protocol.org/latest/definitions/#agent-provider)\n\\\n\\\nThe service provider of the agent (organization, URL).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'capabilities',
    insertText: 'capabilities',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Agent Capabilities Object](https://a2a-protocol.org/latest/definitions/#agent-capabilities)\n\\\n\\\nOptional capabilities supported by the agent (streaming, push notifications, extensions, extended agent card).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'defaultInputModes',
    insertText: 'defaultInputModes',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Media types the agent accepts as input across all skills. May be overridden per skill.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'defaultOutputModes',
    insertText: 'defaultOutputModes',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Media types the agent can produce as output across all skills.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'supportedInterfaces',
    insertText: 'supportedInterfaces',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Ordered list of supported interfaces (URL + protocol binding + protocol version). The first entry is preferred.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'skills',
    insertText: 'skills',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Agent Skill Objects](https://a2a-protocol.org/latest/definitions/#agent-skill)\n\\\n\\\nDistinct capabilities the agent can perform.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'securitySchemes',
    insertText: 'securitySchemes',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'A map of named security schemes (`apiKeySecurityScheme`, `httpAuthSecurityScheme`, `oauth2SecurityScheme`, `openIdConnectSecurityScheme`, `mtlsSecurityScheme`).',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'securityRequirements',
    insertText: 'securityRequirements',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Security requirements that clients must satisfy to contact the agent.',
    },
    targetSpecs: A2A1,
  },
  {
    label: 'signatures',
    insertText: 'signatures',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'JSON Web Signatures computed for this Agent Card (RFC 7515 JWS).',
    },
    targetSpecs: A2A1,
  },
  // Nested: AgentCapabilities properties
  {
    label: 'streaming',
    insertText: 'streaming',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Indicates if the agent supports streaming responses.',
    },
    conditions: [{ function: 'isInsideAgentCapabilities' }],
    targetSpecs: A2A1,
  },
  {
    label: 'pushNotifications',
    insertText: 'pushNotifications',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Indicates if the agent supports sending push notifications for asynchronous task updates.',
    },
    conditions: [{ function: 'isInsideAgentCapabilities' }],
    targetSpecs: A2A1,
  },
  // Nested: AgentSkill properties
  {
    label: 'id',
    insertText: 'id',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Unique identifier for the skill.',
    },
    conditions: [{ function: 'isInsideAgentSkill' }],
    targetSpecs: A2A1,
  },
  {
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: "Keywords describing the skill's capabilities.",
    },
    conditions: [{ function: 'isInsideAgentSkill' }],
    targetSpecs: A2A1,
  },
  {
    label: 'examples',
    insertText: 'examples',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Example prompts or scenarios this skill can handle.',
    },
    conditions: [{ function: 'isInsideAgentSkill' }],
    targetSpecs: A2A1,
  },
  // Nested: SecurityScheme subtype fields
  {
    label: 'apiKeySecurityScheme',
    insertText: 'apiKeySecurityScheme',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'API key authentication scheme. Set this OR one of the other security scheme subfields.',
    },
    conditions: [{ function: 'isInsideSecurityScheme' }],
    targetSpecs: A2A1,
  },
  {
    label: 'httpAuthSecurityScheme',
    insertText: 'httpAuthSecurityScheme',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'HTTP authentication scheme (Basic, Bearer, etc., per RFC 7235).',
    },
    conditions: [{ function: 'isInsideSecurityScheme' }],
    targetSpecs: A2A1,
  },
  {
    label: 'oauth2SecurityScheme',
    insertText: 'oauth2SecurityScheme',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'OAuth 2.0 authentication scheme.',
    },
    conditions: [{ function: 'isInsideSecurityScheme' }],
    targetSpecs: A2A1,
  },
  {
    label: 'openIdConnectSecurityScheme',
    insertText: 'openIdConnectSecurityScheme',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'OpenID Connect authentication scheme.',
    },
    conditions: [{ function: 'isInsideSecurityScheme' }],
    targetSpecs: A2A1,
  },
  {
    label: 'mtlsSecurityScheme',
    insertText: 'mtlsSecurityScheme',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'Mutual TLS authentication scheme.',
    },
    conditions: [{ function: 'isInsideSecurityScheme' }],
    targetSpecs: A2A1,
  },
];

export default completion;
