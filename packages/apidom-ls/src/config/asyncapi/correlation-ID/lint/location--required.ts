import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const locationRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CORRELATION_ID_FIELD_LOCATION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'location'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['location'],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'location' field",
        action: 'addChild',
        snippetYaml: 'location: \n  ',
        snippetJson: '"location": "",\n    ',
      },
    ],
  },
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default locationRequiredLint;
