import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemeRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_SCHEME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scheme' when type=http",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['in'],
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
        message: "add 'in' field",
        action: 'addChild',
        snippetYaml: 'scheme: \n  ',
        snippetJson: '"scheme": "",\n    ',
      },
    ],
  },
};

export default schemeRequiredLint;
