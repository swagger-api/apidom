const documentation = [
  {
    target: 'clientId',
    docs: 'The client identifier.',
  },
  {
    target: 'cleanSession',
    docs: '`boolean`\n\\\n\\\nWhether to create a persistent connection or not. When `false`, the connection will be persistent.',
  },
  {
    target: 'lastWill',
    docs: '`object`\n\\\n\\\nLast Will and Testament configuration.',
  },
  {
    target: 'keepAlive',
    docs: '`integer`\n\\\n\\\nInterval in seconds of the longest period of time the broker and the client can endure without sending a message.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.1.0" MUST be assumed.',
  },
  {
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/blob/master/mqtt/README.md#server-binding-object)\n\nThis object contains information about the server representation in MQTT.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`clientId` | string | The client identifier.\n`cleanSession` | boolean | Whether to create a persisten connection or not. When `false`, the connection will be persistent.\n`lastWill` | object | Last Will and Testament configuration.\n`lastWill.topic` | string | The topic where the Last Will and Testament message will be sent.\n`lastWill.qos` | integer | Defines how hard the broker/client will try to ensure that the Last Will and Testament message is received. Its value MUST be either 0, 1 or 2.\n`lastWill.message` | string | Last Will message.\n`lastWill.retain` | boolean | Whether the broker should retain the Last Will and Testament message or not.\n`keepAlive` | integer | Interval in seconds of the longest period of time the broker and the client can endure without sending a message.\n`bindingVersion` | string | The version of this binding. If omitted, "0.1.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nservers:\n  production:\n    bindings:\n      mqtt:\n        clientId: guest\n        cleanSession: true\n        lastWill:\n          topic: /last-wills\n          qos: 2\n          message: Guest gone offline.\n          retain: false\n        keepAlive: 60\n        bindingVersion: 0.1.0\n```',
  },
];
export default documentation;
