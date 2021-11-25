import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaMinimumOfLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINUMUM,
  source: 'apilint',
  message: "minimum' value must be a number",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^-?\\d*\\.{0,1}\\d+$', 'number'],
  marker: 'value',
  target: 'minimum',
  data: {},
};

export default schemaMinimumOfLint;
