import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

const additionalPropertiesNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALPROPERTIES_NONOBJECT,
  source: 'apilint',
  message: 'additionalProperties has no effect on non objects',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['additionalProperties'],
  marker: 'key',
  markerTarget: 'additionalProperties',
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
        message: 'remove additionalProperties',
        action: 'removeChild',
        functionParams: ['additionalProperties'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default additionalPropertiesNonObjectLint;
