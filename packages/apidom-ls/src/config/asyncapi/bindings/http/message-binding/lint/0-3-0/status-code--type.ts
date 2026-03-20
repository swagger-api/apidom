import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const statusCodeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_HTTP_MESSAGE_BINDING_FIELD_STATUS_CODE_TYPE,
  source: 'apilint',
  message: "'statusCode' value must be an integer",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['integer'],
  marker: 'value',
  target: 'statusCode',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.3.0']],
    },
  ],
};

export default statusCodeTypeLint;
