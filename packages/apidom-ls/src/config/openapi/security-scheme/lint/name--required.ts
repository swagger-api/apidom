import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const nameRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
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
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['apiKey'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
};

export default nameRequiredLint;
