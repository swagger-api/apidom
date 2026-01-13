import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const maxLengthNonStringLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXLENGTH_NONSTRING,
  source: 'apilint',
  message: 'maxLength has no effect on non strings',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['maxLength'],
  marker: 'key',
  markerTarget: 'maxLength',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      negate: true,
      params: ['string'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove maxLength',
        action: 'removeChild',
        functionParams: ['maxLength'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI2, ...OpenAPI3],
};

export default maxLengthNonStringLint;
