import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_REQUIRED_NONOBJECT,
  source: 'apilint',
  message: 'required has no effect on non objects',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['required'],
  marker: 'key',
  markerTarget: 'required',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      negate: true,
      params: ['object'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove required',
        action: 'removeChild',
        functionParams: ['required'],
        target: 'parent',
      },
    ],
  },
};

export default requiredNonObjectLint;
