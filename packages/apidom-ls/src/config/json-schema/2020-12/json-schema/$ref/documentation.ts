import { DocumentationMeta } from '../../../../../apidom-language-types.ts';
import JSONSchema202012 from '../../target-specs.ts';

const documentation: DocumentationMeta[] = [
  {
    target: '$ref',
    docs: 'The "$ref" keyword is an applicator that is used to reference a statically identified schema. Its results are the results of the referenced schema. Note that this definition of how the results are determined means that other keywords can appear alongside of "$ref" in the same schema object.',
    targetSpecs: JSONSchema202012,
  },
];

export default documentation;
