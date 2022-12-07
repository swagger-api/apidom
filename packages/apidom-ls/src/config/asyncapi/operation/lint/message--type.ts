import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

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
