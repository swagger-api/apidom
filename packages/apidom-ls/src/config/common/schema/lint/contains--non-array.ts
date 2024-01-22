import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../../openapi/target-specs';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';

const containsNonArrayLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_CONTAINS_NONARRAY,
  source: 'apilint',
  message: 'contains has no effect on non arrays',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['contains'],
  marker: 'key',
  markerTarget: 'contains',
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
        message: 'remove contains',
        action: 'removeChild',
        functionParams: ['contains'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI3],
};

export default containsNonArrayLint;
