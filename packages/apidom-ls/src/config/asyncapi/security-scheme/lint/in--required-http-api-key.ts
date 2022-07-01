import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const inRequiredHttpApiKeyLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_IN_REQUIRED_HTTP_API_KEY,
  source: 'apilint',
  message: "should always have a 'in' when type=httpApiKey",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['in'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['httpApiKey'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'in' field",
        action: 'addChild',
        snippetYaml: 'in: \n  ',
        snippetJson: '"in": "",\n    ',
      },
    ],
  },
};

export default inRequiredHttpApiKeyLint;
