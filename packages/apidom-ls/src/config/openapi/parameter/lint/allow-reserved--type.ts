import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const allowReservedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_ALLOW_RESERVED_TYPE,
  source: 'apilint',
  message: 'allowReserved must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'allowReserved',
  data: {},
};

export default allowReservedTypeLint;
