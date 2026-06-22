import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const tagsRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_SKILL_FIELD_TAGS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'tags' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['tags'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'tags' field",
        action: 'addChild',
        snippetYaml: 'tags:\n  - \n',
        snippetJson: '"tags": [],\n',
      },
    ],
  },
};

export default tagsRequiredLint;
