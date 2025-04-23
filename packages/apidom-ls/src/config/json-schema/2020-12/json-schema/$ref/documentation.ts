import { DocumentationMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const documentation: DocumentationMeta[] = [
  {
    target: '$ref',
    docs: 'The "$ref" keyword is an applicator that is used to reference a statically identified schema. Its results are the results of the referenced schema. Note that this definition of how the results are determined means that other keywords can appear alongside of "$ref" in the same schema object.\n\\\n\\\nhe value of the "$ref" keyword MUST be a string which is a URI-Reference. Resolved against the current URI base, it produces the URI of the schema to apply. This resolution is safe to perform on schema load, as the process of evaluating an instance cannot change how the reference resolves.',
    targetSpecs: JSONSchema202012,
  },
];

export default documentation;
