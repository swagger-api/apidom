import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'topic',
    docs: "[identifier](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#identifier)\n\\\n\\\n**Optional.** Often we can assume that the SNS Topic is the channel name-we provide this field in case the you need to supply the ARN, or the Topic name is not the channel name in the AsyncAPI document.\n\nField Name | Type | Description\n---|:---:|---\n`url` | string | **Optional.** The endpoint is a URL\n`email` | string | **Optional.** The endpoint is an email address\n`phone` | string | **Optional.** The endpoint is a phone number\n`arn` | string | **Optional.** The target is an ARN. For example, for SQS, the identifier may be an ARN, which will be of the form: \"arn:aws:sqs:{region}:{account-id}:{queueName}\"\n`name` | string | **Optional.** The endpoint is identified by a name, which corresponds to an identifying field called 'name' of a binding for that protocol on the Operation Object. For example, if the protocol is 'sqs' then the name refers to the name field sqs binding. We don't use $ref because we are referring, not including.",
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'topic',
    docs: "[identifier](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#identifier)\n\\\n\\\n**Optional.** Often we can assume that the SNS Topic is the channel name-we provide this field in case the you need to supply the ARN, or the Topic name is not the channel name in the AsyncAPI document.\n\nField Name | Type | Description\n---|:---:|---\n`url` | string | **Optional.** The endpoint is a URL\n`email` | string | **Optional.** The endpoint is an email address\n`phone` | string | **Optional.** The endpoint is a phone number\n`arn` | string | **Optional.** The target is an ARN. For example, for SQS, the identifier may be an ARN, which will be of the form: \"arn:aws:sqs:{region}:{account-id}:{queueName}\"\n`name` | string | **Optional.** The endpoint is identified by a name, which corresponds to an identifying field called 'name' of a binding for that protocol on the Operation Object. For example, if the protocol is 'sqs' then the name refers to the name field sqs binding. We don't use $ref because we are referring, not including.",
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'consumers',
    docs: '[[consumer](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#consumer)]\n\\\n\\\n**Required.** The protocols that listen to this topic and their endpoints.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'consumers',
    docs: '[[consumer](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#consumer)]\n\\\n\\\n**Required.** The protocols that listen to this topic and their endpoints.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'deliveryPolicy',
    docs: '[deliveryPolicy](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#delivery-policy)\n\\\n\\\n**Optional.** Policy for retries to HTTP. The field is the default for HTTP receivers of the SNS Topic which may be overridden by a specific consumer.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'deliveryPolicy',
    docs: '[deliveryPolicy](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#delivery-policy)\n\\\n\\\n**Optional.** Policy for retries to HTTP. The field is the default for HTTP receivers of the SNS Topic which may be overridden by a specific consumer.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\n**Optional**, defaults to `latest`. The version of this binding.',
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#operation)\n\nThis object contains the information to configure the SNS Topic for a publish (send to subscribers) operation.\n\nField Name | Type | Description\n---|:---:|---\n`topic` | [identifier](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#identifier-object) | **Optional.** The SNS topic identifier for the channel, in case the topic name is not the channel name in the AsyncAPI document.\n`consumers` | [[consumer](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#consumer)] | **Required.** The protocols that listen to this topic, for the publish (send to subscribers) operation.\n`deliveryPolicy` | [deliveryPolicy](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#delivery-policy-object) | **Optional.** Policy for retries to HTTP. The default for HTTP receivers of the SNS Topic.\n`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#operation)\n\nThis object contains the information to configure the SNS Topic for a send or receive operation.\n\nField Name | Type | Description\n---|:---:|---\n`topic` | [identifier](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#identifier-object) | **Optional.** The SNS topic identifier for the channel, in case the topic name is not the channel name in the AsyncAPI document.\n`consumers` | [[consumer](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#consumer)] | **Required.** The protocols that listen to this topic, for the receive operation.\n`deliveryPolicy` | [deliveryPolicy](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#delivery-policy-object) | **Optional.** Policy for retries to HTTP. The default for HTTP receivers of the SNS Topic.\n`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.',
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
