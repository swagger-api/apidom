const documentation = [
  {
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/tree/master/mqtt5#server)\n\n**MQTT version 5 specific bindings are deprecated in favor of MQTT bindings that are not version specific.**\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`sessionExpiryInterval` | integer \\| [Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | **Optional**. Session Expiry Interval in seconds or a Schema Object containing the definition of the interval.\n`bindingVersion` | string | **Optional**, defaults to `0.2.0`. The version of this binding.',
  },
  {
    target: 'sessionExpiryInterval',
    docs: '**Optional**. Session Expiry Interval in seconds or a Schema Object containing the definition of the interval.',
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    target: 'sessionExpiryInterval',
    docs: '**Optional**. Session Expiry Interval in seconds or a Schema Object containing the definition of the interval.',
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'bindingVersion',
    docs: '**Optional**, defaults to `0.2.0`. The version of this binding.',
  },
];
export default documentation;
