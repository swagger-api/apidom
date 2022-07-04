import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const exclusiveMaximumPatternLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXCLUSIVEMAXIMUM,
  source: 'apilint',
  message: "exclusiveMaximum' value must be a number",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^-?\\d*\\.{0,1}\\d+$', 'number'],
  marker: 'value',
  target: 'exclusiveMaximum',
  data: {},
};

export default exclusiveMaximumPatternLint;
