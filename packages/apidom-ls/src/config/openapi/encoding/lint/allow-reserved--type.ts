import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const allowReservedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_ENCODING_FIELD_ALLOW_RESERVED_TYPE,
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
