import { AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: '#### [Operation Reply Address Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject)\n\nAn object that specifies where an operation has to send the reply.\n\nFor specifying and computing the location of a reply address, a [runtime expression](https://www.asyncapi.com/docs/reference/specification/v3.0.0#runtimeExpression) is used.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nlocation | `string` | **REQUIRED**. A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v3.0.0#runtimeExpression) that specifies the location of the reply address.\ndescription | `string` | An optional description of the address. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'location',
    docs: '**REQUIRED**. A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v3.0.0#runtimeExpression) that specifies the location of the reply address.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'description',
    docs: 'An optional description of the address. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
