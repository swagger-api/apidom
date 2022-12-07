import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const flowsRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_FLOWS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'flows'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['flows'],
  marker: 'key',
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
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['oauth2'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
};

export default flowsRequiredLint;
