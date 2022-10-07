import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_REQUIRED_EQUALS,
  source: 'apilint',
  message: "'required' must be true",
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [[true]],
  marker: 'value',
  target: 'required',
  conditions: [
    {
      targets: [{ path: 'in' }],
      function: 'apilintContainsValue',
      params: ['path'],
    },
  ],
  data: {},
};

export default requiredEqualsLint;
