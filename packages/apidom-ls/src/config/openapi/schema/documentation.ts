import $idDocumentation from '../../json-schema/2020-12/json-schema/$id/documentation.ts';
import $schemaDocumentation from '../../json-schema/2020-12/json-schema/$schema/documentation.ts';
import $refDocumentation from '../../json-schema/2020-12/json-schema/$ref/documentation.ts';
import $commentDocumentation from '../../json-schema/2020-12/json-schema/$comment/documentation.ts';
import { compose, assoc } from '../../json-schema/2020-12/target-specs.ts';
import documentation from '../../common/schema/documentation.ts';
import { OpenAPI31 } from '../target-specs.ts';

export default [
  ...compose(
    [$idDocumentation, $schemaDocumentation, $refDocumentation, $commentDocumentation],
    assoc(OpenAPI31),
  ),
  ...documentation,
];
