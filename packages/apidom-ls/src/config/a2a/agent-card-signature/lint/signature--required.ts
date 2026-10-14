import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const signatureRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_SIGNATURE_FIELD_SIGNATURE_REQUIRED,
  source: 'apilint',
  message: "should always have a 'signature' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['signature'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'signature' field",
        action: 'addChild',
        snippetYaml: "signature: ''\n",
        snippetJson: '"signature": "",\n',
      },
    ],
  },
};

export default signatureRequiredLint;
