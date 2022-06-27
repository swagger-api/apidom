import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeFlowsRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_FLOWS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'flows'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['flows'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['oauth2'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'flows' field",
        action: 'addChild',
        snippetYaml: 'flows: \n  ',
        snippetJson: '"flows": {},\n    ',
      },
    ],
  },
};

export default securitySchemeFlowsRequiredLint;
