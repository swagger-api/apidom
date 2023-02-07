const documentation = [
  {
    docs: '#### [Identifier](https://www.asyncapi.com/docs/reference/specification/v2.6.0#A2SIdString)\n\nThis field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/reference/specification/v2.6.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\\\n\\\nIt is RECOMMENDED to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.\n\n###### Examples\n\n\n\\\nJSON\n```json\n{\n  "id": "urn:example:com:smartylighting:streetlights:server"\n}\n```\n\n\n\\\nYAML\n```yaml\nid: \'urn:example:com:smartylighting:streetlights:server\'\n```\n\n```json\n{\n  "id": "https://github.com/smartylighting/streetlights-server"\n}\n```\n\n```yaml\nid: \'https://github.com/smartylighting/streetlights-server\'\n```',
  },
];

export default documentation;
