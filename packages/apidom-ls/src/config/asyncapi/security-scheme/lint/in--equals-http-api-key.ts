import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const inEqualsHttpApiKeyLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_IN_EQUALS_HTTP_API_KEY,
  source: 'apilint',
  message: 'type must be one of allowed values',
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'cookie']],
  marker: 'value',
  target: 'in',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['httpApiKey'],
    },
  ],
};

export default inEqualsHttpApiKeyLint;
