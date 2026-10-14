import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const flowsRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_OAUTH2_SECURITY_SCHEME_FIELD_FLOWS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'flows' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['flows'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'flows' field",
        action: 'addChild',
        snippetYaml: 'flows: \n  \n',
        snippetJson: '"flows": {\n  \n  },\n',
      },
    ],
  },
};

export default flowsRequiredLint;
