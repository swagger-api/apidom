import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const minItemsNonArrayLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINITEMS_NONARRAY,
  source: 'apilint',
  message: 'minItems has no effect on non arrays',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['minItems'],
  marker: 'key',
  markerTarget: 'minItems',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      negate: true,
      params: ['array'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove minItems',
        action: 'removeChild',
        functionParams: ['minItems'],
        target: 'parent',
      },
    ],
  },
};

export default minItemsNonArrayLint;
