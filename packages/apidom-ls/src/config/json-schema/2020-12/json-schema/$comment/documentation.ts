import { DocumentationMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const documentation: DocumentationMeta[] = [
  {
    target: '$comment',
    docs: 'This keyword reserves a location for comments from schema authors to readers or maintainers of the schema.\n\\\n\\\nThe value of this keyword MUST be a string. Implementations MUST NOT present this string to end users. Tools for editing schemas SHOULD support displaying and editing this keyword. The value of this keyword MAY be used in debug or error output which is intended for developers making use of schemas.\n\\\n\\\nSchema vocabularies SHOULD allow "$comment" within any object containing vocabulary keywords. Implementations MAY assume "$comment" is allowed unless the vocabulary specifically forbids it. Vocabularies MUST NOT specify any effect of "$comment" beyond what is described in this specification.\n\\\n\\\nTools that translate other media types or programming languages to and from application/schema+json MAY choose to convert that media type or programming language\'s native comments to or from "$comment" values. The behavior of such translation when both native comments and "$comment" properties are present is implementation-dependent.\n\\\n\\\nImplementations MAY strip "$comment" values at any point during processing. In particular, this allows for shortening schemas when the size of deployed schemas is a concern.\n\\\n\\\nImplementations MUST NOT take any other action based on the presence, absence, or contents of "$comment" properties. In particular, the value of "$comment" MUST NOT be collected as an annotation result.',
    targetSpecs: JSONSchema202012,
  },
];

export default documentation;
