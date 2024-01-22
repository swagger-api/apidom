import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI31 } from '../../../openapi/target-specs';

const thenNonIfLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_THEN_NONIF,
  source: 'apilint',
  message: '"then" has no effect without a "if"',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['then'],
  marker: 'key',
  markerTarget: 'then',
  conditions: [
    {
      function: 'missingField',
      params: ['if'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove then',
        action: 'removeChild',
        functionParams: ['then'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default thenNonIfLint;
