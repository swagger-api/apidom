import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const amqp1TypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_AMQP1_TYPE,
  source: 'apilint',
  message: '"amqp1" must be a AMQP 1.0 Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['amqp1ChannelBinding']],
  marker: 'value',
  target: 'amqp1',
  data: {},
};

export default amqp1TypeLint;
