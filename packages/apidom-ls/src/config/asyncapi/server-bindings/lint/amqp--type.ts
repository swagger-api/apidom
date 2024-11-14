import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const amqpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_AMQP_TYPE,
  source: 'apilint',
  message: '"amqp" must be a AMQP Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['amqpServerBinding']],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpTypeLint;
