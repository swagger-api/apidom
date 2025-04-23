import $idCompletion from '../../json-schema/2020-12/json-schema/$id/completion.ts';
import $schemaCompletion from '../../json-schema/2020-12/json-schema/$schema/completion.ts';
import $refCompletion from '../../json-schema/2020-12/json-schema/$ref/completion.ts';
import $commentCompletion from '../../json-schema/2020-12/json-schema/$comment/completion.ts';
import { compose, assoc } from '../../json-schema/2020-12/target-specs.ts';
import completion from '../../common/schema/completion.ts';
import { OpenAPI31 } from '../target-specs.ts';

export default [
  ...compose(
    [$idCompletion, $schemaCompletion, $refCompletion, $commentCompletion],
    assoc(OpenAPI31),
  ),
  ...completion,
];
