import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI31 } from '../../../openapi/target-specs';

const elseNonIfLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ELSE_NONIF,
  source: 'apilint',
  message: '"else" has no effect without a "if"',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['else'],
  marker: 'key',
  markerTarget: 'else',
  conditions: [
    {
      function: 'missingField',
      params: ['if'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove else',
        action: 'removeChild',
        functionParams: ['else'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default elseNonIfLint;
