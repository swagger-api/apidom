import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const parametersInConsumesRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_PARAMETERS_IN_CONSUMES_REQUIRED,
  source: 'apilint',
  message:
    'Operations with Parameter of "in: formData" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintFieldValueOrArray',
  linterParams: ['consumes', ['multipart/form-data', 'application/x-www-form-urlencoded']],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'parameters' }],
      function: 'apilintHasParameterKeyValue',
      params: ['in', 'formData'],
    },
  ],
  data: {},
  targetSpecs: OpenAPI2,
};

export default parametersInConsumesRequiredLint;
