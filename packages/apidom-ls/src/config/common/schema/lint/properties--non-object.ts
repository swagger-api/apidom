import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const propertiesNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTIES_NONOBJECT,
  source: 'apilint',
  message: 'properties has no effect on non objects',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['properties'],
  marker: 'key',
  markerTarget: 'properties',
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
        message: 'remove properties',
        action: 'removeChild',
        functionParams: ['properties'],
        target: 'parent',
      },
    ],
  },
};

export default propertiesNonObjectLint;
