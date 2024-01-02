import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const inRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_IN_REQUIRED,
  source: 'apilint',
  message: "should always have an 'in'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
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
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default inRequiredLint;
