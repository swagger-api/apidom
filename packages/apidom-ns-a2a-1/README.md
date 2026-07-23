# @swagger-api/apidom-ns-a2a-1

`@swagger-api/apidom-ns-a2a-1` contains ApiDOM namespace specific to the [A2A (Agent-to-Agent) Protocol v1.0](https://a2a-protocol.org/latest/definitions/).
It models the **AgentCard** document — the `/.well-known/agent.json` manifest that describes an agent's identity, capabilities, skills, supported interfaces, and security requirements.

## Installation

You can install this package via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-ns-a2a-1
```

## A2A 1.0 namespace

A2A 1.0 namespace consists of [elements](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-a2a-1/src/elements) implemented on top
of [primitive ones](https://github.com/refractproject/minim/tree/master/lib/primitives).

```js
import { createNamespace } from '@swagger-api/apidom-core';
import a2a1Namespace from '@swagger-api/apidom-ns-a2a-1';

const namespace = createNamespace(a2a1Namespace);

const objectElement = new namespace.elements.Object();
const agentCardElement = new namespace.elements.AgentCard();
```

When namespace instance is created in this way, it will extend the base namespace
with the namespace provided as an argument.

Elements from the namespace can also be used directly by importing them.

```js
import { AgentCardElement, AgentSkillElement } from '@swagger-api/apidom-ns-a2a-1';

const skillElement = new AgentSkillElement();
const agentCardElement = new AgentCardElement();
```

## Predicates

This package exposes [predicates](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-a2a-1/src/predicates.ts)
for all higher order elements that are part of this namespace.

```js
import { isAgentCardElement, AgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

const agentCardElement = new AgentCardElement();

isAgentCardElement(agentCardElement); // => true
```

## Traversal

Traversing ApiDOM in this namespace is possible by using `visit` function from `apidom-core` package.
This package comes with its own [keyMap](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-a2a-1/src/traversal/visitor.ts#L18) and [nodeTypeGetter](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-a2a-1/src/traversal/visitor.ts#L6).
To learn more about these `visit` configuration options please refer to [@swagger-api/apidom-ast documentation](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ast/README.md#visit).

```js
import { visit } from '@swagger-api/apidom-core';
import { AgentCardElement, keyMap, getNodeType } from '@swagger-api/apidom-ns-a2a-1';

const element = new AgentCardElement();

const visitor = {
  AgentCardElement(agentCardElement) {
    console.dir(agentCardElement);
  },
};

visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType });
```

## Refractors

Refractor is a special layer inside the namespace that can transform either JavaScript structures
or generic ApiDOM structures into structures built from elements of this namespace.

**Refracting JavaScript structures**:

```js
import { AgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

const object = {
    name: 'Recipe Agent',
    description: 'Helps users find and follow recipes',
    url: 'https://recipes.example.com/a2a',
    version: '1.0.0',
};

AgentCardElement.refract(object); // => AgentCardElement({ name, description, url, version })
```

**Refracting generic ApiDOM structures**:

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { AgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

const objectElement = new ObjectElement({
    name: 'Recipe Agent',
    description: 'Helps users find and follow recipes',
    url: 'https://recipes.example.com/a2a',
    version: '1.0.0',
});

AgentCardElement.refract(objectElement); // => AgentCardElement({ name = 'Recipe Agent', ... })
```

### Refractor plugins

Refractors can accept plugins as a second argument of refract static method.

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { AgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

const objectElement = new ObjectElement({
    name: 'Recipe Agent',
    version: '1.0.0',
});

const plugin = ({ predicates, namespace }) => ({
  name: 'plugin',
  pre() {
      console.dir('runs before traversal');
  },
  visitor: {
    AgentCardElement(agentCardElement) {
      agentCardElement.version = '2.0.0';
    },
  },
  post() {
      console.dir('runs after traversal');
  },
});

AgentCardElement.refract(objectElement, { plugins: [plugin] }); // => AgentCardElement({ name = 'Recipe Agent', version = '2.0.0' })
```

#### Replace Empty Element plugin

This plugin is specific to YAML 1.2 format, which allows defining key-value pairs with empty key,
empty value, or both. If the value is not provided in YAML format, this plugin compensates for
this missing value with the most appropriate semantic element type.

```js
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { refractorPluginReplaceEmptyElement, AgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

const yamlDefinition = `
name: Recipe Agent
url: https://recipes.example.com/a2a
version: 1.0.0
capabilities:
`;
const apiDOM = await parse(yamlDefinition);
const agentCardElement = AgentCardElement.refract(apiDOM.result, {
  plugins: [refractorPluginReplaceEmptyElement()],
});

// =>
// (AgentCardElement
//   (MemberElement
//     (StringElement)
//     (StringElement))
//   (MemberElement
//     (StringElement)
//     (StringElement))
//   (MemberElement
//     (StringElement)
//     (StringElement))
//   (MemberElement
//     (StringElement)
//     (AgentCapabilitiesElement)))

// => without the plugin the result would be as follows:
// (AgentCardElement
//   ...
//   (MemberElement
//     (StringElement)
//     (StringElement)))
```

## Implementation notes

- **Source of truth.** A2A's normative spec is the [Protocol Buffers definition](https://github.com/a2aproject/A2A). The [JSON Schema bundle](https://a2a-protocol.org/latest/spec/a2a.json) used here is non-normative and machine-generated from the `.proto` files. Use the `.proto` to resolve ambiguities.

- **camelCase canonicalisation.** A2A's JSON encoding allows both camelCase and snake_case property names (a protobuf JSON convention). Element classes expose camelCase getters/setters. Snake_case keys for the dual-named fields in the A2A schema are canonicalised to camelCase by `refractor/canonicalize.ts` before refraction, so both spellings refract to the same tree.

- **SecurityScheme is a wrapper.** The A2A schema models `SecurityScheme` as a protobuf `oneof` — a wrapper object with five named optional subfields (`apiKeySecurityScheme`, `httpAuthSecurityScheme`, `mtlsSecurityScheme`, `oauth2SecurityScheme`, `openIdConnectSecurityScheme`). It is not `type`-discriminated like OpenAPI's SecurityScheme.

- **Scope.** This namespace models the AgentCard *document*. Wire-protocol messages (JSON-RPC requests, responses, errors; Task, Message, Artifact types) live in the same A2A schema but are not modelled here.

- **Media types.** A2A has no IANA-registered media type. This namespace uses a `application/vnd.a2a;version=1.0.0` convention; revisit when/if A2A registers an official one.

## Implementation progress

Only fully implemented specification objects should be checked here.

- [x] [AgentCard Object](https://a2a-protocol.org/latest/specification/#441-agentcard)
- [x] [AgentCapabilities Object](https://a2a-protocol.org/latest/specification/#442-agentcapabilities)
- [x] [AgentExtension Object](https://a2a-protocol.org/latest/specification/#443-agentextension)
- [x] [AgentProvider Object](https://a2a-protocol.org/latest/specification/#444-agentprovider)
- [x] [AgentInterface Object](https://a2a-protocol.org/latest/specification/#446-agentinterface)
- [x] [AgentSkill Object](https://a2a-protocol.org/latest/specification/#445-agentskill)
- [x] [AgentCardSignature Object](https://a2a-protocol.org/latest/specification/#447-agentcardsignature)
- [x] [SecurityRequirement Object](https://a2a-protocol.org/latest/specification/#448-securityrequirement)
- [x] [SecurityScheme Object](https://a2a-protocol.org/latest/specification/#449-securityscheme)

## License

Apache-2.0
