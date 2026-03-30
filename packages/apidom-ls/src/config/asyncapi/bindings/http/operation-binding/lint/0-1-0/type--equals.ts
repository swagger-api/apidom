import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_HTTP_OPERATION_BINDING_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: "'type' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['request', 'response']],
  marker: 'value',
  target: 'type',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default typeEqualsLint;
