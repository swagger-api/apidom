import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const requiredRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_REQUIRED_REQUIRED,
  source: 'apilint',
  message: "should always have a 'required'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['required'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'in' }],
      function: 'apilintContainsValue',
      params: ['path'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'required' field",
        action: 'addChild',
        snippetYaml: 'required: \n  ',
        snippetJson: '"required": ,\n    ',
      },
    ],
  },
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default requiredRequiredLint;
