import $idLint from './$id/lint/index.ts';
import $schemaLint from './$schema/lint/index.ts';
import $refLint from './$ref/lint/index.ts';
import $commentLint from './$comment/lint/index.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { compose } from '../target-specs.ts';

const lints: LinterMeta[] = compose([$idLint, $schemaLint, $refLint, $commentLint]);

export default lints;
