import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const urlRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_URL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'url'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['url'],
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
        message: "add 'url'",
        action: 'addChild',
        snippetYaml: 'url: \n    ',
        snippetJson: '"url": "",\n      ',
      },
    ],
  },
  targetSpecs: AsyncAPI2,
};

export default urlRequiredLint;
