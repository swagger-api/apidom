import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const maxLengthNonStringLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXLENGTH_NONSTRING,
  source: 'apilint',
  message: 'maxLength has no effect on non strings',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['maxLength'],
  marker: 'key',
  markerTarget: 'maxLength',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      negate: true,
      params: ['string'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove maxLength',
        action: 'removeChild',
        functionParams: ['maxLength'],
        target: 'parent',
      },
    ],
  },
};

export default maxLengthNonStringLint;
