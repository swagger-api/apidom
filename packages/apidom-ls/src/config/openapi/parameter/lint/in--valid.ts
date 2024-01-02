import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const inValidLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_IN_VALID,
  source: 'apilint',
  message: "'in' field must contain 'formData' value for 'type'=file",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintContainsValue',
  linterParams: ['formData'],
  marker: 'value',
  target: 'in',
  data: {},
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['file'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  targetSpecs: OpenAPI2,
};

export default inValidLint;
