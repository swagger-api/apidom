const documentation = [
  {
    target: 'type',
    docs: '**REQUIRED**. Type of operation. Its value MUST be either request or response.',
  },
  {
    target: 'method',
    docs: 'When `type` is `request`, this is the HTTP method, otherwise it MUST be ignored. Its value MUST be one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`.',
  },
  {
    target: 'query',
    docs: '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "latest" MUST be assumed.',
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#operation-binding-object)\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`type` | string | **Required**. Type of operation. Its value MUST be either `request` or `response`.\n`method` | string | When `type` is `request`, this is the HTTP method, otherwise it MUST be ignored. Its value MUST be one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`.\n`query` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | A Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.\n`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  /employees:\n    subscribe:\n      bindings:\n        http:\n          type: request\n          method: GET\n          query:\n            type: object\n            required:\n              - companyId\n            properties:\n              companyId:\n                type: number\n                minimum: 1\n                description: The Id of the company.\n            additionalProperties: false\n          bindingVersion: \'0.1.0\'\n```',
  },
];
export default documentation;
