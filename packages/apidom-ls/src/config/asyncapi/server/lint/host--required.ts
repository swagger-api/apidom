import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const hostRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_SERVER_FIELD_HOST_REQUIRED,
  source: 'apilint',
  message: "should always have a 'host'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['host'],
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
        message: "add 'host'",
        action: 'addChild',
        snippetYaml: 'host: \n    ',
        snippetJson: '"host": "",\n      ',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};

export default hostRequiredLint;
