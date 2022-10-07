import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const allowEmptyValueTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_ALLOW_EMPTY_VALUE_TYPE,
  source: 'apilint',
  message: 'allowEmptyValue must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'allowEmptyValue',
  data: {},
};

export default allowEmptyValueTypeLint;
