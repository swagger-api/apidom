import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const minLengthNonStringLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINLENGTH_NONSTRING,
  source: 'apilint',
  message: 'minLength has no effect on non strings',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['minLength'],
  marker: 'key',
  markerTarget: 'minLength',
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
        message: 'remove minLength',
        action: 'removeChild',
        functionParams: ['minLength'],
        target: 'parent',
      },
    ],
  },
};

export default minLengthNonStringLint;
