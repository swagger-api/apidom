import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const ifNonThenLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_IF_NONTHEN,
  source: 'apilint',
  message: '"if" has no effect without a "then"',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['if'],
  marker: 'key',
  markerTarget: 'if',
  conditions: [
    {
      function: 'missingField',
      params: ['then'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove if',
        action: 'removeChild',
        functionParams: ['if'],
        target: 'parent',
      },
    ],
  },
};

export default ifNonThenLint;
