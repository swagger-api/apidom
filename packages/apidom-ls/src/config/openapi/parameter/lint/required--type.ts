import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_REQUIRED_TYPE,
  source: 'apilint',
  message: 'required must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'required',
  data: {},
};

export default requiredTypeLint;
