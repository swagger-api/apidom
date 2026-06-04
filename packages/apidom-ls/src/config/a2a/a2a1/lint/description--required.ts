import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const descriptionRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_DESCRIPTION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'description' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['description'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'description' field",
        action: 'addChild',
        snippetYaml: "description: ''\n",
        snippetJson: '"description": "",\n',
      },
    ],
  },
};

export default descriptionRequiredLint;
