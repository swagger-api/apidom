import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaMultipleOfLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MULTIPLEOF,
  source: 'apilint',
  message: "multipleOf' value must be a number > 0",
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [false, true, false],
  marker: 'value',
  target: 'multipleOf',
  data: {},
};

export default schemaMultipleOfLint;
