import $idDocumentation from './$id/documentation.ts';
import $schemaDocumentation from './$schema/documentation.ts';
import $refDocumentation from './$ref/documentation.ts';
import $commentDocumentation from './$comment/documentation.ts';
import { DocumentationMeta } from '../../../../apidom-language-types.ts';
import { compose, JSONSchema202012 } from '../target-specs.ts';

const documentation: DocumentationMeta[] = compose([
  $idDocumentation,
  $schemaDocumentation,
  $refDocumentation,
  $commentDocumentation,
  {
    docs: '#### [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12)\n\nThe JSON Schema Draft 2020-12 is a comprehensive update to the previous draft 2019-09, addressing feedback and implementation experiences. This draft introduces features to simplify creating and validating JSON schemas.\n\nDraft 2020-12 Documents\n\n- Specifications\n  - Core: [draft-bhutton-json-schema-01](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html)\n  - Validation: [draft-bhutton-json-schema-validation-01](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01.html)\n  - Relative JSON Pointer: [draft-bhutton-relative-json-pointer-00](https://tools.ietf.org/html/draft-bhutton-relative-json-pointer-00)\n  - Published: 16-June-2022',
    targetSpecs: JSONSchema202012,
  },
]);

export default documentation;
