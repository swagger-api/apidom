import { AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: '#### [Operation Reply Address Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject)\n\nAn object that specifies where an operation has to send the reply.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'location',
    docs: 'A [runtime expression](https://www.asyncapi.com/docs/reference/specification/v3.0.0#runtimeExpression) that specifies the location of the reply address.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'description',
    docs: 'A description of the address. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
