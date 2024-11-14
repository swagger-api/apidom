import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const messageTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_MESSAGE_TYPE,
  source: 'apilint',
  message: '"message" must be a Message Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['message', 'operation-message', 'operation-message-map']],
  marker: 'value',
  target: 'message',
  data: {},
};

export default messageTypeLint;
