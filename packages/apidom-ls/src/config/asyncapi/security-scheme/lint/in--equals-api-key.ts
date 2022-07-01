import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const inEqualsApiKeyLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_IN_EQUALS_API_KEY,
  source: 'apilint',
  message: 'type must be one of allowed values',
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['user', 'password']],
  marker: 'value',
  target: 'in',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['apiKey'],
    },
  ],
};

export default inEqualsApiKeyLint;
