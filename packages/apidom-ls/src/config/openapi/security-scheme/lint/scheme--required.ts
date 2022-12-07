import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemeRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_SCHEME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'scheme'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['scheme'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'scheme' field",
        action: 'addChild',
        snippetYaml: 'scheme: \n  ',
        snippetJson: '"scheme": {},\n    ',
      },
    ],
  },
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['http'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
};

export default schemeRequiredLint;
