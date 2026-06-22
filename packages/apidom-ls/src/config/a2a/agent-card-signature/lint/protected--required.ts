import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const protectedRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_SIGNATURE_FIELD_PROTECTED_REQUIRED,
  source: 'apilint',
  message: "should always have a 'protected' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['protected'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'protected' field",
        action: 'addChild',
        snippetYaml: "protected: ''\n",
        snippetJson: '"protected": "",\n',
      },
    ],
  },
};

export default protectedRequiredLint;
