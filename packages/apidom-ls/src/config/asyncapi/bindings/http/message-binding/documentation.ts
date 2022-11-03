const documentation = [
  {
    target: 'headers',
    docs: '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "latest" MUST be assumed.',
  },
  {
    docs: "#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/http/README.md#message-binding-object)\n\nThis object contains information about the message representation in HTTP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`headers` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#schemaObject) | A Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.\n`bindingVersion` | string | The version of this binding. If omitted, \"latest\" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n\n\n\\\nYAML\n```yaml\nchannels:\n  test:\n    publish:\n      message:\n        bindings:\n          http:\n            headers:\n              type: object\n              properties:\n                Content-Type:\n                  type: string\n                  enum: ['application/json']\n            bindingVersion: '0.1.0'\n```",
  },
];
export default documentation;
