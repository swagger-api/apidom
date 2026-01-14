import { AsyncAPI2, AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: '#### [Tags Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#tagsObject)\n\nA Tags object is a list of Tag Objects.',
    targetSpecs: AsyncAPI2,
  },
  {
    docs: '#### [Tags Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagsObject)\n\nA Tags object is a list of [Tag Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject). A [Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject) in a list can be referenced by [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject).',
    targetSpecs: AsyncAPI3,
  },
];
export default documentation;
