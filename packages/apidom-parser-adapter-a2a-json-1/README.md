# @swagger-api/apidom-parser-adapter-a2a-json-1

Parser adapter for [A2A (Agent-to-Agent) Protocol v1.0](https://a2a-protocol.org/latest/definitions/) AgentCard documents in JSON format. Refracts into [`@swagger-api/apidom-ns-a2a-1`](../apidom-ns-a2a-1).

## Installation

```sh
npm install --save @swagger-api/apidom-parser-adapter-a2a-json-1
```

## Usage

```ts
import * as a2aJsonAdapter from '@swagger-api/apidom-parser-adapter-a2a-json-1';
import ApiDOMParser from '@swagger-api/apidom-parser';

const parser = new ApiDOMParser().use(a2aJsonAdapter);
const result = await parser.parse(jsonSource);
```

## Detection

A2A AgentCard documents have **no version discriminator field** (unlike OpenAPI's `"openapi": "3.1.0"`). This adapter uses **structural detection**: a JSON document is treated as an A2A AgentCard when it contains both a `capabilities` object and a `skills` array. False positives are possible — set the `mediaType` on the `File` explicitly when known.

## License

Apache-2.0
