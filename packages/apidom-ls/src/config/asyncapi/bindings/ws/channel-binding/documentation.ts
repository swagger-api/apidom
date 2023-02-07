const documentation = [
  {
    target: 'method',
    docs: 'The HTTP method to use when establishing the connection. Its value MUST be either `GET` or `POST`.',
  },
  {
    target: 'query',
    docs: '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.',
  },
  {
    target: 'headers',
    docs: '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions of the HTTP headers to use when establishing the connection. This schema MUST be of type `object` and have a `properties` key.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.1.0" MUST be assumed.',
  },
  {
    docs: '#### [Channel Binding Object](https://github.com/asyncapi/bindings/tree/master/websockets#channel)\n\nWhen using WebSockets, the channel represents the connection. Unlike other protocols that support multiple virtual channels (topics, routing keys, etc.) per connection, WebSockets doesn\'t support virtual channels or, put it another way, there\'s only one channel and its characteristics are strongly related to the protocol used for the handshake, i.e., HTTP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`method` | string | The HTTP method to use when establishing the connection. Its value MUST be either `GET` or `POST`.\n`query` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | A Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.\n`headers` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | A Schema object containing the definitions of the HTTP headers to use when establishing the connection. This schema MUST be of type `object` and have a `properties` key.\n`bindingVersion` | string | The version of this binding. If omitted, "0.1.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.',
  },
];
export default documentation;
