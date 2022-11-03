const documentation = [
  {
    target: 'destinationType',
    docs: 'Defines the type of AsyncAPI channel.',
  },
  {
    target: 'queue',
    docs: '`Map[string, any]`\n\\\n\\\nDefines the properties of a queue.',
  },
  {
    target: 'topic',
    docs: 'Map[string, any]\n\\\n\\\nDefines the properties of a topic.',
  },
  {
    target: 'maxMsgLength',
    docs: '`integer`\n\\\n\\\nThe maximum length of the physical message (in bytes) accepted by the Topic or Queue. Messages produced that are greater in size than this value may fail to be delivered. More information on the maximum message length can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.adm.doc/q085520_.html#q085520___maxmsgl) in the IBM MQ Knowledge Center.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding.',
  },
  {
    docs: '#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/ibmmq/#channel)\n\nThis object contains information about the channel representation in IBM MQ. Each channel corresponds to a Queue or Topic within IBM MQ.\n\n##### Fixed Fields\n\nField Name | Type | Description | Applicability [default] | Constraints\n---|:---:|---|:---|:---\n`destinationType` | string | Defines the type of AsyncAPI channel.  | OPTIONAL [`topic`] | MUST be either `topic` or `queue`. For type `topic`, the AsyncAPI channel name MUST be assumed for the IBM MQ topic string unless overridden.\n`queue` | Map[string, any] | Defines the properties of a queue. | REQUIRED if `destinationType` = `queue` | `queue` and `topic` fields MUST NOT coexist within a channel binding\n`queue.objectic` | `queue` and `topic` fields MUST NOT coexist within a channel binding.\n`topic.string`  | string | The value of the IBM MQ topic string to be used. | OPTIONAL *Note: if specified, SHALL override AsyncAPI channel name.* | MUST NOT exceed 10240 characters in length. MAY coexist with `topic.objectName`\n`topic.objectName`  | string | The name of the IBM MQ topic object. | OPTIONAL *Note: if specified, SHALL override AsyncAPI channel name.*| MUST NOT exceed 48 characters in length. MAY coexist with `topic.string`\n`topic.durablePermitted` | boolean | Defines if the subscription may be durable. | OPTIONAL [`true`] | -\n`topic.lastMsgRetained` | boolean | Defines if the last message published will be made available to new subscriptions. | OPTIONAL [`false`] | -\n`maxMsgLength` | integer | The maximum length of the physical message (in bytes) accepted by the Topic or Queue. Messages produced that are greater in size than this value may fail to be delivered. More information on the maximum message length can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.adm.doc/q085520_.html#q085520___maxmsgl) in the IBM MQ Knowledge Center. | OPTIONAL [negotiated on IBM MQ channel]| MUST be  `0-104,857,600` bytes (100 MB).\n`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`] | -\n\n\nThis object MUST contain only the properties defined above.\n\n##### Example for an IBM MQ Topic where topic string is defined by AsyncAPI channel\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signedup:\n```\n\n##### Example for AsyncAPI channel mapping to an IBM MQ topic with a specified MQ Topic object\n\n```yaml\nchannels:\n  user/signedup:\n    bindings:\n      ibmmq:\n        destinationType: topic\n        topic:\n          objectName: myTopicName\n        bindingVersion: 0.1.0\n```\n\n##### Example for AsyncAPI channel mapping to an IBM MQ Queue\n\n```yaml\nchannels:\n  user/signedup:\n    bindings:\n      ibmmq:\n        destinationType: queue\n        queue:\n          objectName: myQueueName\n          exclusive: true\n        bindingVersion: 0.1.0\n```',
  },
];
export default documentation;
