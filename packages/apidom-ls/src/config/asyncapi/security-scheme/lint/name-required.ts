import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeNameRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
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
        message: "add 'name' field",
        action: 'addChild',
        snippetYaml: 'name: \n  ',
        snippetJson: '"name": "",\n    ',
      },
    ],
  },
};

export default securitySchemeNameRequiredLint;
