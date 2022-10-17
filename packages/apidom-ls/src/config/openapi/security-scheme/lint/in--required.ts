import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const inRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_SECURITY_SCHEME_FIELD_IN_REQUIRED,
  source: 'apilint',
  message: "should always have a 'in'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['in'],
  marker: 'key',
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
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['apiKey'],
    },
  ],
};

export default inRequiredLint;
