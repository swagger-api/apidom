import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    target: 'name',
    docs: '`string`\n\\\n\\\n**Required.** The name of the topic. Can be different from the channel name to allow flexibility around AWS resource naming limitations.',
  },
  {
    target: 'ordering',
    docs: '[ordering](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#ordering)\n\\\n\\\n**Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`type` | string | **Required.** Defines the type of SNS Topic. Can be either standard or FIFO.\n`contentBasedDeduplication` | boolean | **Optional.** Whether the de-duplication of messages should be turned on. Defaults to `false`',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'ordering',
    docs: '[ordering](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#ordering)\n\\\n\\\n**Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`type` | string | **Required.** Defines the type of SNS Topic. Can be either standard or FIFO.\n`contentBasedDeduplication` | boolean | **Optional.** Whether the de-duplication of messages should be turned on. Defaults to `false`',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'policy',
    docs: '[policy](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#policy)\n\\\n\\\n**Optional.** The security policy for the SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`statements` | array | **Required.** An array of Statement objects, each of which controls a permission for this topic',
    targetSpecs: AsyncAPI2,
  },
  {
    target: 'policy',
    docs: '[policy](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#policy)\n\\\n\\\n**Optional.** The security policy for the SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`statements` | array | **Required.** An array of Statement objects, each of which controls a permission for this topic',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'tags',
    docs: '`object`\n\\\n\\\n**Optional.** Key-value pairs that represent AWS tags on the topic.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\n**Optional**, defaults to `latest`. The version of this binding.',
  },
  {
    docs: '#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#channel)\n\nThis object contains the information to configure the associated SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`name` | string | **Required.** The name of the topic. Can be different from the channel name to allow flexibility around AWS resource naming limitations.\n`ordering` | [ordering](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#ordering-object) | **Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.\n`policy` | [policy](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#policy-object) | **Optional.** The security policy for the SNS Topic.\n`tags` | object | **Optional.** Key-value pairs that represent AWS tags on the topic.\n`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#channel)\n\nThis object contains the information to configure the associated SNS Topic.\n\nField Name | Type | Description\n---|:---:|---\n`name` | string | **Required.** The name of the topic. Can be different from the channel name to allow flexibility around AWS resource naming limitations.\n`ordering` | [ordering](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#ordering-object) | **Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.\n`policy` | [policy](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#policy-object) | **Optional.** The security policy for the SNS Topic.\n`tags` | object | **Optional.** Key-value pairs that represent AWS tags on the topic.\n`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.',
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
