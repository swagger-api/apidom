import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_WS_TYPE,
  source: 'apilint',
  message: '"ws" must be a WebSockets Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['wsMessageBinding']],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsTypeLint;
