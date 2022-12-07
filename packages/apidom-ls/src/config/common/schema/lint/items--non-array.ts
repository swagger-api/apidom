import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const itemsNonArrayLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ITEMS_NONARRAY,
  source: 'apilint',
  message: 'items has no effect on non arrays',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['items'],
  marker: 'key',
  markerTarget: 'items',
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
        message: 'remove items',
        action: 'removeChild',
        functionParams: ['items'],
        target: 'parent',
      },
    ],
  },
};

export default itemsNonArrayLint;
