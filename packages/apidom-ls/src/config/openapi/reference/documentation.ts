import { OpenAPI31 } from '../target-specs';

const documentation = [
  {
    target: '$ref',
    docs: '**REQUIRED**. The reference identifier. This MUST be in the form of a URI.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'summary',
    docs: 'A short summary which by default SHOULD override that of the referenced component. If the referenced object-type does not allow a `summary` field, then this field has no effect.',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'description',
    docs: 'A description which by default SHOULD override that of the referenced component. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation. If the referenced object-type does not allow a `description` field, then this field has no effect.',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
