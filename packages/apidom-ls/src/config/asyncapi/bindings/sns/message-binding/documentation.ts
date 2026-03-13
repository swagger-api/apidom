import { AsyncAPI2, AsyncAPI3 } from '../../../target-specs.ts';

const documentation = [
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md#message)\n\nThis object MUST NOT contain any properties. Its name is reserved for future use.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Message Binding Object](https://github.com/asyncapi/bindings/blob/master/sns/3.0.0/README.md#message)\n\nThis object MUST NOT contain any properties. Its name is reserved for future use.',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
