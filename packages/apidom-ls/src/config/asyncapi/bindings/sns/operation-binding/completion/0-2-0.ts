import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'topic',
    insertText: 'topic',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '**Optional.** The SNS topic identifier. Use this if the SNS topic name differs from the channel name in the AsyncAPI document.\n\nField Name | Type | Description\n---|:---:|---\n`url` | string | **Optional.** The URL of a resource\n`email` | string | **Optional.** The email address of an endpoint\n`phone` | string | **Optional.** The phone number of an endpoint\n`arn` | string | **Optional.** The Amazon Resource Name of an endpoint\n`name` | string | **Optional.** The name of an endpoint',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'consumers',
    insertText: 'consumers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '**Required.** The protocols that listen to this topic and their associated endpoints, for a publish operation.\n\nEach consumer object has the following fields:\n\nField Name | Type | Description\n---|:---:|---\n`protocol` | string | **Required.** The protocol that this endpoint receives messages by. One of: `http`, `https`, `email`, `email-json`, `sms`, `sqs`, `application`, `lambda`, `firehose`\n`endpoint` | Identifier Object | **Required.** The endpoint messages are delivered to.\n`filterPolicy` | object | **Optional.** Only receive a subset of messages from the channel, based on these criteria.\n`filterPolicyScope` | string | **Optional.** `MessageAttributes` or `MessageBody`\n`rawMessageDelivery` | boolean | **Required.** If true, SNS delivers the message without wrapping the payload in JSON.\n`redrivePolicy` | object | **Optional.** Prevent poison pill messages by moving un-processable messages to a dead letter queue.\n`deliveryPolicy` | object | **Optional.** Policy for retries to HTTP endpoints.\n`displayName` | string | **Optional.** The display name to use with an SNS subscription',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
  {
    label: 'deliveryPolicy',
    insertText: 'deliveryPolicy',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    targetSpecs: AsyncAPI2,
    documentation: {
      kind: 'markdown',
      value:
        '**Optional.** Policy for retries to HTTP endpoints. This is the default delivery policy for the SNS Topic for a subscribe operation.\n\nField Name | Type | Description\n---|:---:|---\n`minDelayTarget` | integer | **Optional.** The minimum delay for a retry\n`maxDelayTarget` | integer | **Optional.** The maximum delay for a retry\n`numRetries` | integer | **Optional.** The total number of retries\n`numNoDelayRetries` | integer | **Optional.** The number of retries to perform immediately\n`numMinDelayRetries` | integer | **Optional.** The number of retries at the minimum delay\n`numMaxDelayRetries` | integer | **Optional.** The number of retries at the maximum delay\n`backoffFunction` | string | **Optional.** `arithmetic`, `exponential`, `geometric`, or `linear`\n`maxReceivesPerSecond` | integer | **Optional.** The maximum number of deliveries per second',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.2.0']],
      },
    ],
  },
];

export default completion;
