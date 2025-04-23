import { DocumentationMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const documentation: DocumentationMeta[] = [
  {
    target: '$schema',
    docs: 'The "$schema" keyword is both used as a JSON Schema dialect identifier and as the identifier of a resource which is itself a JSON Schema, which describes the set of valid schemas written for this particular dialect.\n\\\n\\\nThe value of this keyword MUST be a [URI [RFC3986]](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#RFC3986) (containing a scheme) and this URI MUST be normalized. The current schema MUST be valid against the meta-schema identified by this URI.\n\\\n\\\nIf this URI identifies a retrievable resource, that resource SHOULD be of media type "application/schema+json".\n\\\n\\\nThe "$schema" keyword SHOULD be used in the document root schema object, and MAY be used in the root schema objects of embedded schema resources. It MUST NOT appear in non-resource root schema objects. If absent from the document root schema, the resulting behavior is implementation-defined.\n\\\n\\\nValues for this property are defined elsewhere in this and other documents, and by other parties.',
    targetSpecs: JSONSchema202012,
  },
];

export default documentation;
