import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const flowsRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_FLOWS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'flows'",
  severity: DiagnosticSeverity.Error,
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
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default flowsRequiredLint;
