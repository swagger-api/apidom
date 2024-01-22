import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

const minPropertiesNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINPROPERTIES_NONOBJECT,
  source: 'apilint',
  message: 'minProperties has no effect on non objects',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'missingField',
  linterParams: ['minProperties'],
  marker: 'key',
  markerTarget: 'minProperties',
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
        message: 'remove minProperties',
        action: 'removeChild',
        functionParams: ['minProperties'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default minPropertiesNonObjectLint;
