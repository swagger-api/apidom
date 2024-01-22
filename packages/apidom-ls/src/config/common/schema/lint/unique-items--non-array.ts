import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

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
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default uniqueItemsNonArrayLint;
