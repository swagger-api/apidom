import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const capabilitiesRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_CAPABILITIES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'capabilities' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['capabilities'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'capabilities' field",
        action: 'addChild',
        snippetYaml: 'capabilities:\n  \n',
        snippetJson: '"capabilities": {},\n',
      },
    ],
  },
};

export default capabilitiesRequiredLint;
