# @swagger-api/apidom-ns-a2a-1

`apidom-ns-a2a-1` contains the ApiDOM namespace for the [A2A (Agent-to-Agent) Protocol v1.0](https://a2a-protocol.org/latest/definitions/). It models the **Agent Card** document type — the `/.well-known/agent.json` manifest that describes an agent's identity, capabilities, skills, supported interfaces, and security requirements.

## Installation

```sh
npm install --save @swagger-api/apidom-ns-a2a-1
```

## Usage

```ts
import { AgentCardElement, isAgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

const card = AgentCardElement.refract({
  name: 'Recipe Agent',
  description: 'Helps users find and follow recipes',
  url: 'https://recipes.example.com/a2a',
  version: '1.0.0',
  capabilities: {
    streaming: true,
    pushNotifications: false,
  },
  defaultInputModes: ['text/plain'],
  defaultOutputModes: ['application/json'],
  skills: [
    {
      id: 'find-recipe',
      name: 'Find Recipe',
      description: 'Locate recipes matching ingredients or cuisine.',
      tags: ['recipes', 'cooking'],
    },
  ],
});

isAgentCardElement(card); // true
card.name?.toValue();     // "Recipe Agent"
card.capabilities?.streaming?.toValue(); // true
```

## Supported elements

`AgentCard`, `AgentCapabilities`, `AgentExtension`, `AgentProvider`, `AgentInterface`, `AgentSkill`, `AgentCardSignature`, `SecurityRequirement`, `SecurityScheme` (wrapper) and its five concrete subtypes (`APIKey`, `HTTPAuth`, `MutualTls`, `OAuth2`, `OpenIdConnect`), `OAuthFlows` and its five flow subtypes (`AuthorizationCode`, `ClientCredentials`, `DeviceCode`, `Implicit`, `Password`), and `StringList`.

## Implementation notes

- **Source of truth.** A2A's normative spec is the [Protocol Buffers definition](https://github.com/a2aproject/A2A). The [JSON Schema bundle](https://a2a-protocol.org/latest/spec/a2a.json) used here is non-normative and machine-generated from the `.proto` files. Use the `.proto` to resolve ambiguities.

- **camelCase canonicalisation.** A2A's JSON encoding allows both camelCase and snake_case property names (a protobuf JSON convention). Element classes expose camelCase getters/setters. Snake_case keys for the 28 dual-named fields in the A2A schema are canonicalised to camelCase by `refractor/canonicalize.ts` before refraction, so both spellings refract to the same tree.

- **SecurityScheme is a wrapper.** The A2A schema models `SecurityScheme` as a protobuf `oneof` — a wrapper object with five named optional subfields (`apiKeySecurityScheme`, `httpAuthSecurityScheme`, `mtlsSecurityScheme`, `oauth2SecurityScheme`, `openIdConnectSecurityScheme`). It is not `type`-discriminated like OpenAPI's SecurityScheme.

- **Scope.** This namespace models the AgentCard *document*. Wire-protocol messages (JSON-RPC requests, responses, errors; Task, Message, Artifact types) live in the same A2A schema but are not modelled here.

- **Media types.** A2A has no IANA-registered media type. This namespace uses a `application/vnd.a2a;version=1.0.0` convention; revisit when/if A2A registers an official one.

## License

Apache-2.0
