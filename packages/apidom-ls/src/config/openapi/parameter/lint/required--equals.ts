import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const requiredEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_REQUIRED_EQUALS,
  source: 'apilint',
  message: "'required' must be true",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [[true]],
  marker: 'value',
  target: 'required',
  conditions: [
    {
      targets: [{ path: 'in' }],
      function: 'apilintContainsValue',
      params: ['path'],
    },
  ],
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default requiredEqualsLint;
