import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const parametersTypeConsumesRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_PARAMETERS_TYPE_CONSUMES_REQUIRED,
  source: 'apilint',
  message:
    'Operations with parameters of "type: file" must include "multipart/form-data" in their "consumes" property',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintFieldValueOrArray',
  linterParams: ['consumes', ['multipart/form-data']],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'parameters' }],
      function: 'apilintHasParameterKeyValue',
      params: ['type', 'file'],
    },
  ],
  data: {},
  targetSpecs: OpenAPI2,
};

export default parametersTypeConsumesRequiredLint;
