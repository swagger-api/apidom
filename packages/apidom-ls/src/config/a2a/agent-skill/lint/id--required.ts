import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const idRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_SKILL_FIELD_ID_REQUIRED,
  source: 'apilint',
  message: "should always have an 'id' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['id'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'id' field",
        action: 'addChild',
        snippetYaml: "id: ''\n",
        snippetJson: '"id": "",\n',
      },
    ],
  },
};

export default idRequiredLint;
