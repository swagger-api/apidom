import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_REQUIRED_EQUALS,
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
};

export default requiredEqualsLint;
