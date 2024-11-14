import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const inRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_IN_REQUIRED,
  source: 'apilint',
  message: "should always have a 'in' when type='apiKey'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['in'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'in' field",
        action: 'addChild',
        snippetYaml: 'in: \n  ',
        snippetJson: '"in": "",\n    ',
      },
    ],
  },
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['apiKey'],
    },
  ],
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default inRequiredLint;
