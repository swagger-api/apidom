import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const deprecatedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_DEPRECATED_TYPE,
  source: 'apilint',
  message: 'deprecated must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'deprecated',
  data: {},
};

export default deprecatedTypeLint;
