import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const defaultOutputModesRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_DEFAULT_OUTPUT_MODES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'defaultOutputModes' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['defaultOutputModes'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'defaultOutputModes' field",
        action: 'addChild',
        snippetYaml: 'defaultOutputModes:\n  - \n',
        snippetJson: '"defaultOutputModes": [],\n',
      },
    ],
  },
};

export default defaultOutputModesRequiredLint;
