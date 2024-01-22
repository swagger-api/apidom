import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

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
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default minItemsNonArrayLint;
