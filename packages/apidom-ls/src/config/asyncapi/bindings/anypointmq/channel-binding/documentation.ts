const documentation = [
  {
    target: 'destination',
    docs: '**Optional**, defaults to the channel name. The destination (queue or exchange) name for this channel. SHOULD only be specified if the channel name differs from the actual destination name, such as when the channel name is not a valid destination name in Anypoint MQ.',
  },
  {
    target: 'destinationType',
    docs: '**Optional**, defaults to `queue`. The type of destination, which MUST be either `exchange` or `queue` or `fifo-queue`. SHOULD be specified to document the messaging model (publish/subscribe, point-to-point, strict message ordering) supported by this channel.',
  },
  {
    target: 'bindingVersion',
    docs: '**Optional**, defaults to `0.1.0`. The version of this binding.',
  },
  {
    docs: "#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/anypointmq/README.md#channel-binding-object)\n\nThe Anypoint MQ [Channel Binding Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#channel-bindings-object) is defined by a [JSON Schema](https://github.com/asyncapi/bindings/blob/master/anypointmq/json_schemas/channel.json), which defines these fields:\n\nField Name | Type | Description\n---|:---:|---\n`destination`       | string | **Optional**, defaults to the channel name. The destination (queue or exchange) name for this channel. SHOULD only be specified if the channel name differs from the actual destination name, such as when the channel name is not a valid destination name in Anypoint MQ.\n`destinationType`          | string | **Optional**, defaults to `queue`. The type of destination, which MUST be either `exchange` or `queue` or `fifo-queue`. SHOULD be specified to document the messaging model (publish/subscribe, point-to-point, strict message ordering) supported by this channel.\n`bindingVersion` | string | **Optional**, defaults to `0.1.0`. The version of this binding.\n\nNote that an Anypoint MQ exchange can only be sent to, not received from. To receive messages sent to an exchange, [an intermediary queue must be defined and bound to the exchange](https://docs.mulesoft.com/mq/mq-understanding#message-exchanges). In this bindings specification, these intermediary queues are not exposed in the AsyncAPI document. Instead, it is simply assumed that whenever messages must be received from an exchange, such an intermediary queue is involved yet invisible in the AsyncAPI document.\n\n**Examples:**\n\nThe following example shows a `channels` object with two channels, the second having a channel binding object for `anypointmq`:\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    description: |\n      This application receives command messages from this channel about users to sign up.\n      Minimal configuration, omitting a channel binding object.\n    publish:\n      #...\n  user/signedup:\n    description: |\n      This application sends events to this channel about users that have signed up.\n      Explicitly provides a channel binding object.\n    bindings:\n      anypointmq:\n        destination:     user-signup-exchg\n        destinationType: exchange\n        bindingVersion:  '0.0.1'\n    subscribe:\n      #...\n```",
  },
];
export default documentation;
