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
        "[identifier](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#identifier)\n\\\nApplies to `Publish`, `Subscribe`.\n\\\n**Optional.** Often we can assume that the SNS Topic is the channel name-we provide this field in case you need to supply the ARN, or the Topic name is not the channel name in the AsyncAPI document.\n\nField Name | Type | Description\n---|:---:|---\n`url` | string | **Optional.** The endpoint is a URL\n`email` | string | **Optional.** The endpoint is an email address\n`phone` | string | **Optional.** The endpoint is a phone number\n`arn` | string | **Optional.** The target is an [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html). For example, for SQS, the identifier may be an ARN, which will be of the form: \"arn:aws:sqs:{region}:{account-id}:{queueName}\"\n`name` | string | **Optional.** The endpoint is identified by a name, which corresponds to an identifying field called 'name' of a binding for that protocol on this **publish** Operation Object. For example, if the protocol is 'sqs' then the name refers to the name field **sqs** binding. We don't use $ref because we are referring, not including.",
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
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
        '[[consumer](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#consumer)]\n\\\nApplies to `Publish`.\n\\\n**Required.** The protocols that listen to this topic and their endpoints.\n\nField Name | Type | Description\n---|:---:|---\n`protocol` | string | **Required.** The protocol that this endpoint receives messages by. Can be `http`, `https`, `email`, `email-json`, `sms`, `sqs`, `application`, `lambda` or `firehose`\n`endpoint` | [identifier](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#identifier) | **Required.** The endpoint messages are delivered to.\n`filterPolicy` | object | **Optional.** Only receive a subset of messages from the channel, determined by this policy.\n`filterPolicyScope` | string | **Optional.** Determines whether the FilterPolicy applies to MessageAttributes (default) or MessageBody.\n`rawMessageDelivery` | boolean | **Required.** If true AWS SNS attributes are removed from the body, and for SQS, SNS message attributes are copied to SQS message attributes. If false the SNS attributes are included in the body.\n`redrivePolicy` | [redrivePolicy](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#redrive-policy) | **Optional.** Prevent poison pill messages by moving un-processable messages to an SQS dead letter queue.\n`deliveryPolicy` | [deliveryPolicy](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#delivery-policy) | **Optional.** Policy for retries to HTTP. The parameter is for that [SNS Subscription](https://docs.aws.amazon.com/sns/latest/api/API_Subscribe.html) and overrides any policy on the [SNS Topic](https://docs.aws.amazon.com/sns/latest/api/API_CreateTopic.html).\n`displayName` | string | **Optional.** The display name to use with an SMS subscription',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
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
        '[deliveryPolicy](https://github.com/asyncapi/bindings/blob/e14c6782a95aaa009d33b9a6b72194cbaebd39ff/sns/README.md#delivery-policy)\n\\\nApplies to `Subscribe`.\n\\\n**Optional.** Policy for retries to HTTP. The field is the default for HTTP receivers of the [SNS Topic](https://docs.aws.amazon.com/sns/latest/api/API_CreateTopic.html) which may be overridden by a specific consumer.\n\nField Name | Type | Description\n---|:---:|---\n`minDelayTarget` | integer | **Optional.** The minimum delay for a retry in seconds\n`maxDelayTarget` | integer | **Optional.** The maximum delay for a retry in seconds\n`numRetries` | integer | **Optional.** The total number of retries, including immediate, pre-backoff, backoff, and post-backoff retries\n`numNoDelayRetries` | integer | **Optional.** The number of immediate retries (with no delay)\n`numMinDelayRetries` | integer | **Optional.** The number of immediate retries (with delay)\n`numMaxDelayRetries` | integer | **Optional.** The number of post-backoff phase retries, with the maximum delay between retries\n`backoffFunction` | string, one of: arithmetic, exponential, geometric or linear | **Optional.** The algorithm for backoff between retries\n`maxReceivesPerSecond` | integer | **Optional.** The maximum number of deliveries per second, per subscription',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
];

export default completion;
