import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI3 } from '../../../openapi/target-specs';

const additionalItemsNonArrayLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALITEMS_NONARRAY,
  source: 'apilint',
  message: 'additionalItems has no effect on non arrays',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['additionalItems'],
  marker: 'key',
  markerTarget: 'additionalItems',
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
        message: 'remove additionalItems',
        action: 'removeChild',
        functionParams: ['additionalItems'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI3],
};

export default additionalItemsNonArrayLint;
