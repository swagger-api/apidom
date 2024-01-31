import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_AMQP_TYPE,
  source: 'apilint',
  message: '"amqp" must be a AMQP Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['amqpChannelBinding']],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpTypeLint;
