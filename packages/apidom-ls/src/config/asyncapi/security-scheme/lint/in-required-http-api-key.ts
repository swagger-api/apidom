import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeInRequiredHttpApiKeyLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_IN_REQUIRED,
  source: 'apilint',
  message: "should always have a 'in'",
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

export default securitySchemeInRequiredHttpApiKeyLint;
