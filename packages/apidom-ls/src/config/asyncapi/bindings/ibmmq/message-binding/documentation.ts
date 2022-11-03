const documentation = [
  {
    target: 'type',
    docs: 'The type of the message.',
  },
  {
    target: 'headers',
    docs: 'Defines the IBM MQ message headers to include with this message. More than one header can be specified as a comma separated list. Supporting information on IBM MQ message formats can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097520_.html) in the IBM MQ Knowledge Center.',
  },
  {
    target: 'description',
    docs: 'Provides additional information for application developers: describes the message type or format.',
  },
  {
    target: 'expiry',
    docs: '`integer`\n\\\n\\\nThe recommended setting the client should use for the TTL (Time-To-Live) of the message. This is a period of time expressed in milliseconds and set by the application that puts the message. `expiry` values are API dependant e.g., MQI and JMS use different units of time and default values for *`unlimited`*. General information on IBM MQ message expiry can be found on this [page](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097490_.html) in the IBM MQ Knowledge Center.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding.',
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/ibmmq/README.md#message-binding-object)\n\nThis object contains information about the message representation in IBM MQ.\n\n##### Fixed Fields\n\nField Name | Type  | Description | Applicability [default] | Constraints\n---|:---:|---|:---|:---\n`type` | string |  The type of the message. | OPTIONAL [`string`] | MUST be either `string`, `jms` or `binary`\n`headers` | string | Defines the IBM MQ message headers to include with this message. More than one header can be specified as a comma separated list. Supporting information on IBM MQ message formats can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097520_.html) in the IBM MQ Knowledge Center. | OPTIONAL if `type` = `binary` | `headers` MUST NOT be specified if `type` = `string` or `jms`\n`description` | string | Provides additional information for application developers: describes the message type or format. | OPTIONAL | -\n`expiry` |  integer | The recommended setting the client should use for the TTL (Time-To-Live) of the message. This is a period of time expressed in milliseconds and set by the application that puts the message. `expiry` values are API dependant e.g., MQI and JMS use different units of time and default values for *`unlimited`*. General information on IBM MQ message expiry can be found on this [page](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097490_.html) in the IBM MQ Knowledge Center. | OPTIONAL [*`unlimited`*] | `expiry` value MUST be either `zero` (*`unlimited`*) or greater than zero.\n`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`] | -\n\nThis object MUST contain only the properties defined above.\n\n### Rich Text Formatting\n\nThe `description` field of the IBM MQ message binding object MAY include CommonMark markdown formatting. A minimum markdown syntax as described by [CommonMark 0.27](https://spec.commonmark.org/0.27/) is assumed.\n\n##### Example for plain text message\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          ibmmq:\n            type: string\n            bindingVersion: 0.1.0\n```\n\n##### Example for IBM MQ message using JMS\n\n```yaml\nchannels:\n  user/signup:\n    publish:\n      message:\n        bindings:\n          ibmmq:\n            type: jms\n            description: JMS stream message\n            bindingVersion: 0.1.0\n```',
  },
];
export default documentation;
