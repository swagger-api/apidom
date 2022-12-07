import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const uniqueItemsNonArrayLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_UNIQUEITEMS_NONARRAY,
  source: 'apilint',
  message: 'uniqueItems has no effect on non arrays',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['uniqueItems'],
  marker: 'key',
  markerTarget: 'uniqueItems',
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
        message: 'remove uniqueItems',
        action: 'removeChild',
        functionParams: ['uniqueItems'],
        target: 'parent',
      },
    ],
  },
};

export default uniqueItemsNonArrayLint;
