import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../../openapi/target-specs.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';

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
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI3],
};

export default containsNonArrayLint;
