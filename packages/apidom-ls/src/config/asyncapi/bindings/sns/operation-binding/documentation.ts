import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'topic',
    docs: '**Optional.** The SNS topic identifier. Use this if the SNS topic name differs from the channel name in the AsyncAPI document.',
  },
  {
    target: 'consumers',
    docs: '**Required.** The protocols that listen to this topic and their associated endpoints.',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'consumers',
    docs: '**Required.** The protocols that listen to this topic and their associated endpoints.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'deliveryPolicy',
    docs: '**Optional.** Policy for retries to HTTP endpoints. This is the default delivery policy for the SNS Topic.',
  },
  {
    target: 'bindingVersion',
    docs: '**Optional**, defaults to `latest`. The version of this binding.',
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#operation)\n\nThis object contains the information to configure the SNS Topic for a publish (send to subscribers) operation.\n\nField Name | Type | Description\n---|:---:|---\n`topic` | [Identifier Object](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#identifier-object) | **Optional.** The SNS topic identifier for the channel, in case the topic name is not the channel name in the AsyncAPI document.\n`consumers` | [Consumer Object]\\[\\] | **Required.** The protocols that listen to this topic, for the publish (send to subscribers) operation.\n`deliveryPolicy` | [DeliveryPolicy Object](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#delivery-policy-object) | **Optional.** Policy for retries to HTTP. The default for HTTP receivers of the SNS Topic.\n`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.",
    targetSpecs: AsyncAPI2,
  },
  {
    docs: "#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#operation)\n\nThis object contains the information to configure the SNS Topic for a send or receive operation.\n\nField Name | Type | Description\n---|:---:|---\n`topic` | [Identifier Object](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#identifier-object) | **Optional.** The SNS topic identifier for the channel, in case the topic name is not the channel name in the AsyncAPI document.\n`consumers` | [Consumer Object]\\[\\] | **Required.** The protocols that listen to this topic, for the receive operation.\n`deliveryPolicy` | [DeliveryPolicy Object](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#delivery-policy-object) | **Optional.** Policy for retries to HTTP. The default for HTTP receivers of the SNS Topic.\n`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.",
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
