import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const stompTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_STOMP_TYPE,
  source: 'apilint',
  message: '"stomp" must be a STOMP Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['stompOperationBinding']],
  marker: 'value',
  target: 'stomp',
  data: {},
};

export default stompTypeLint;
