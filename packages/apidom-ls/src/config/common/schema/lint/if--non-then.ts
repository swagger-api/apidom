import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';

const ifNonThenLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_IF_NONTHEN,
  source: 'apilint',
  message: '"if" has no effect without a "then"',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['if'],
  marker: 'key',
  markerTarget: 'if',
  conditions: [
    {
      function: 'missingField',
      params: ['then'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove if',
        action: 'removeChild',
        functionParams: ['if'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default ifNonThenLint;
