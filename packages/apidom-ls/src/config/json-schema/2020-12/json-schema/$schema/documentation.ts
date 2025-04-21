import { DocumentationMeta } from '../../../../../apidom-language-types.ts';
import JSONSchema202012 from '../../target-specs.ts';

const documentation: DocumentationMeta[] = [
  {
    target: '$schema',
    docs: 'The "$schema" keyword is both used as a JSON Schema dialect identifier and as the identifier of a resource which is itself a JSON Schema, which describes the set of valid schemas written for this particular dialect.\n\\\n\\\nThe value of this keyword MUST be a URI [RFC3986] (containing a scheme) and this URI MUST be normalized. The current schema MUST be valid against the meta-schema identified by this URI.',
    targetSpecs: JSONSchema202012,
  },
];

export default documentation;
