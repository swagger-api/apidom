import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const maxMsgLengthTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_MAX_MSG_LENGTH_TYPE,
  source: 'apilint',
  message: "'maxMsgLength' value must be a positive integer (zero included)",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxMsgLength',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default maxMsgLengthTypeLint;
