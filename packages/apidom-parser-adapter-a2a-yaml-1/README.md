# @swagger-api/apidom-parser-adapter-a2a-yaml-1

Parser adapter for [A2A (Agent-to-Agent) Protocol v1.0](https://a2a-protocol.org/latest/definitions/) AgentCard documents in YAML 1.2 format. Refracts into [`@swagger-api/apidom-ns-a2a-1`](../apidom-ns-a2a-1).

## Installation

```sh
npm install --save @swagger-api/apidom-parser-adapter-a2a-yaml-1
```

## Usage

```ts
import * as a2aYamlAdapter from '@swagger-api/apidom-parser-adapter-a2a-yaml-1';
import ApiDOMParser from '@swagger-api/apidom-parser';

const parser = new ApiDOMParser().use(a2aYamlAdapter);
const result = await parser.parse(yamlSource);
```

## Detection

A2A AgentCard documents have **no version discriminator field**. This adapter uses **structural detection**: a YAML or JSON document is treated as an A2A AgentCard when it contains both a `capabilities` mapping and a `skills` sequence. False positives are possible — set the `mediaType` on the `File` explicitly when known.

## License

Apache-2.0
