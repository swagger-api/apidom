const documentation = [
  {
    docs: '#### [Default Content Type](https://www.asyncapi.com/docs/reference/specification/v2.6.0#defaultContentTypeString)\n\nA string representing the default content type to use when encoding/decoding a message\'s payload. The value MUST be a specific media type (e.g. `application/json`). This value MUST be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectContentType) property is omitted.\n\nIn case a message can\'t be encoded/decoded using this value, schema parsers MUST use their default content type.\n\n##### Default Content Type Example\n\n\n\\\nJSON\n```json\n{\n  "defaultContentType": "application/json"\n}\n```\n\n\n\\\nYAML\n```yaml\ndefaultContentType: application/json\n```',
  },
];

export default documentation;
