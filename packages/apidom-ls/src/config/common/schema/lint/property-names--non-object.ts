import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

const propertyNamesNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTYNAMES_NONOBJECT,
  source: 'apilint',
  message: 'propertyNames has no effect on non objects',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['propertyNames'],
  marker: 'key',
  markerTarget: 'propertyNames',
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
        message: 'remove propertyNames',
        action: 'removeChild',
        functionParams: ['propertyNames'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default propertyNamesNonObjectLint;
