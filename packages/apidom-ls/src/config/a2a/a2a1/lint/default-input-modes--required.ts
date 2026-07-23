import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const defaultInputModesRequiredLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_DEFAULT_INPUT_MODES_REQUIRED,
  source: 'apilint',
  message: "should always have a 'defaultInputModes' field",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['defaultInputModes'],
  marker: 'key',
  targetSpecs: A2A1,
  data: {
    quickFix: [
      {
        message: "add 'defaultInputModes' field",
        action: 'addChild',
        snippetYaml: 'defaultInputModes:\n  - \n',
        snippetJson: '"defaultInputModes": [],\n',
      },
    ],
  },
};

export default defaultInputModesRequiredLint;
