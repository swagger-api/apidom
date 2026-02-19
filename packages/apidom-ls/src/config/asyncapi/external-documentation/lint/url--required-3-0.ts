import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const urlRequired3_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_EXTERNAL_DOCUMENTATION_FIELD_URL_REQUIRED,
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
        message: "add 'url' field",
        action: 'addChild',
        snippetYaml: 'url: \n  ',
        snippetJson: '"url": "",\n    ',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};

export default urlRequired3_0Lint;
