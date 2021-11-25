import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaMaximumLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXIMUM,
  source: 'apilint',
  message: "maximum' value must be a number",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^-?\\d*\\.{0,1}\\d+$', 'number'],
  marker: 'value',
  target: 'maximum',
  data: {},
};

export default schemaMaximumLint;
