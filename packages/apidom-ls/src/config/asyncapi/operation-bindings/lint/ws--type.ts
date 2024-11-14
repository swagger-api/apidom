import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const wsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_WS_TYPE,
  source: 'apilint',
  message: '"ws" must be a WebSockets Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['wsOperationBinding']],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsTypeLint;
