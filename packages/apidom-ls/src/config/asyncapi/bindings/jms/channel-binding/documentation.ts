const documentation = [
  {
    target: 'destination',
    docs: '`string`\n\\\n\\\n**Optional**, defaults to the channel name. The destination (queue) name for this channel. SHOULD only be specified if the channel name differs from the actual destination name, such as when the channel name is not a valid destination name according to the JMS Provider.',
  },
  {
    target: 'destinationType',
    docs: '`string`\n\\\n\\\n**Optional**, defaults to `queue`. The type of destination, which MUST be either `queue`, or `fifo-queue`. SHOULD be specified to document the messaging model (point-to-point, or strict message ordering) supported by this channel.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.0.1" MUST be assumed.',
  },
  {
    docs: '#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/jms/README.md#channel-binding-object)\n\nField Name | Type | Description\n---|:---:|---\n`destination` | string | **Optional**, defaults to the channel name. The destination (queue) name for this channel. SHOULD only be specified if the channel name differs from the actual destination name, such as when the channel name is not a valid destination name according to the JMS Provider.\n`destinationType` | string | **Optional**, defaults to `queue`. The type of destination, which MUST be either `queue`, or `fifo-queue`. SHOULD be specified to document the messaging model (point-to-point, or strict message ordering) supported by this channel.\n`bindingVersion` | string | The version of this binding. If omitted, "0.0.1" MUST be assumed.',
  },
];
export default documentation;
