import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'queue',
    insertText: 'queue',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Queue](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#queue)\n\\\n\\\n**Required.** A definition of the queue that will be used as the channel.\n\nField Name | Type | Description\n---|:---:|---\n`name` | string | **Required.** The name of the queue. When an SNS Operation Binding Object references an SQS queue by name, the identifier should be the one in this field.\n`fifoQueue` | boolean | **Required.** Is this a FIFO queue?\n`deduplicationScope` | string | **Optional.** Specifies whether message deduplication occurs at the message group or queue level. Valid values are `messageGroup` and `queue`. This property applies only to high throughput for FIFO queues.\n`fifoThroughputLimit` | string | **Optional.** Specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are `perQueue` and `perMessageGroupId`. The `perMessageGroupId` value is allowed only when the value for DeduplicationScope is `messageGroup`. This property applies only to high throughput for FIFO queues.\n`deliveryDelay` | integer | **Optional.** The number of seconds to delay before a message sent to the queue can be received. Used to create a delay queue. Range is 0 to 15 minutes. Defaults to 0.\n`visibilityTimeout` | integer | **Optional.** The length of time, in seconds, that a consumer locks a message - hiding it from reads - before it is unlocked and can be read again. Range from 0 to 12 hours (43200 seconds). Defaults to 30 seconds.\n`receiveMessageWaitTime` | integer | **Optional.** Determines if the queue uses [short polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) or [long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html). Set to zero (the default) the queue reads available messages and returns immediately. Set to a non-zero integer, long polling waits the specified number of seconds for messages to arrive before returning.\n`messageRetentionPeriod` | integer | **Optional.** How long to retain a message on the queue in seconds, unless deleted. The range is 60 (1 minute) to 1,209,600 (14 days). The default is 345,600 (4 days).\n`redrivePolicy` | [Redrive Policy](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#redrive-policy) | **Optional.** Prevent poison pill messages by moving un-processable messages to an SQS dead letter queue.\n`policy` | [Policy](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#policy) | **Optional.** The security policy for the SQS Queue.\n`tags` | object | **Optional.** Key-value pairs that represent AWS tags on the queue.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'deadLetterQueue',
    insertText: 'deadLetterQueue',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Queue](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#queue)\n\\\n\\\n**Optional.** A definition of the queue that will be used for un-processable messages.\n\nField Name | Type | Description\n---|:---:|---\n`name` | string | **Required.** The name of the queue. When an SNS Operation Binding Object references an SQS queue by name, the identifier should be the one in this field.\n`fifoQueue` | boolean | **Required.** Is this a FIFO queue?\n`deduplicationScope` | string | **Optional.** Specifies whether message deduplication occurs at the message group or queue level. Valid values are `messageGroup` and `queue`. This property applies only to high throughput for FIFO queues.\n`fifoThroughputLimit` | string | **Optional.** Specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are `perQueue` and `perMessageGroupId`. The `perMessageGroupId` value is allowed only when the value for DeduplicationScope is `messageGroup`. This property applies only to high throughput for FIFO queues.\n`deliveryDelay` | integer | **Optional.** The number of seconds to delay before a message sent to the queue can be received. Used to create a delay queue. Range is 0 to 15 minutes. Defaults to 0.\n`visibilityTimeout` | integer | **Optional.** The length of time, in seconds, that a consumer locks a message - hiding it from reads - before it is unlocked and can be read again. Range from 0 to 12 hours (43200 seconds). Defaults to 30 seconds.\n`receiveMessageWaitTime` | integer | **Optional.** Determines if the queue uses [short polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) or [long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html). Set to zero (the default) the queue reads available messages and returns immediately. Set to a non-zero integer, long polling waits the specified number of seconds for messages to arrive before returning.\n`messageRetentionPeriod` | integer | **Optional.** How long to retain a message on the queue in seconds, unless deleted. The range is 60 (1 minute) to 1,209,600 (14 days). The default is 345,600 (4 days).\n`redrivePolicy` | [Redrive Policy](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#redrive-policy) | **Optional.** Prevent poison pill messages by moving un-processable messages to an SQS dead letter queue.\n`policy` | [Policy](https://github.com/asyncapi/bindings/blob/master/sqs/README.md#policy) | **Optional.** The security policy for the SQS Queue.\n`tags` | object | **Optional.** Key-value pairs that represent AWS tags on the queue.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
