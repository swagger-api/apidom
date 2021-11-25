import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaMinLengthLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINLENGTH,
  source: 'apilint',
  message: 'minLength must be a non-negative integer',
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'minLength',
  data: {},
};

export default schemaMinLengthLint;
