import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const explodeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_EXPLODE_TYPE,
  source: 'apilint',
  message: 'explode must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'explode',
  data: {},
};

export default explodeTypeLint;
