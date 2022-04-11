/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  console.log(JSON.stringify(str.trim().replace(/(\r\n|\n|\r)/gm, '\n')));
};

transform(
  `#### Servers Object

The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
\`^[A-Za-z0-9_\\-]+$\` | [Server Object](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject) | The definition of a server this application MAY connect to.

##### Servers Object Example

\`\`\`json
{
  "production": {
    "url": "development.gigantic-server.com",
    "description": "Development server",
    "protocol": "kafka",
    "protocolVersion": "1.0.0"
  }
}
\`\`\`

\`\`\`yaml
production:
  url: development.gigantic-server.com
  description: Development server
  protocol: kafka
  protocolVersion: '1.0.0'
\`\`\``,
);
