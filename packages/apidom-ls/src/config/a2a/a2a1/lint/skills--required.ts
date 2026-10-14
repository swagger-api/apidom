import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const skillsRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_SKILLS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'skills' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['skills'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'skills' field",
        action: 'addChild',
        snippetYaml: 'skills:\n  - \n',
        snippetJson: '"skills": [],\n',
      },
    ],
  },
};

export default skillsRequiredLint;
