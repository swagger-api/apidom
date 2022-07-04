import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const maxLengthTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXLENGTH,
  source: 'apilint',
  message: 'maxLength must be a non-negative integer',
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxLength',
  data: {},
};

export default maxLengthTypeLint;
