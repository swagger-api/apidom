import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

const patternPropertiesNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERNPROPERTIES_NONOBJECT,
  source: 'apilint',
  message: 'patternProperties has no effect on non objects',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['patternProperties'],
  marker: 'key',
  markerTarget: 'patternProperties',
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
        message: 'remove patternProperties',
        action: 'removeChild',
        functionParams: ['patternProperties'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default patternPropertiesNonObjectLint;
