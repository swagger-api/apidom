import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeSchemeRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_SCHEME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scheme'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['scheme'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['http'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'scheme' field",
        action: 'addChild',
        snippetYaml: 'scheme: \n  ',
        snippetJson: '"scheme": "",\n    ',
      },
    ],
  },
};

export default securitySchemeSchemeRequiredLint;
