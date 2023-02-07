const documentation = [
  {
    docs: '#### [Servers Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serversObject)\n\nThe Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject).\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n`^[A-Za-z0-9_\\-]+$` | [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject) | The definition of a server this application MAY connect to.\n\n##### Servers Object Example\n\n\n\\\nJSON\n```json\n{\n  "production": {\n    "url": "development.gigantic-server.com",\n    "description": "Development server",\n    "protocol": "kafka",\n    "protocolVersion": "1.0.0"\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\nproduction:\n  url: development.gigantic-server.com\n  description: Development server\n  protocol: kafka\n  protocolVersion: \'1.0.0\'\n```',
  },
];
export default documentation;
