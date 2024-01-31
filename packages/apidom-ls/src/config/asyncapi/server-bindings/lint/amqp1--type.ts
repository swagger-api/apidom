import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqp1TypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_AMQP1_TYPE,
  source: 'apilint',
  message: '"amqp1" must be a AMQP 1.0 Server Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['amqp1ServerBinding']],
  marker: 'value',
  target: 'amqp1',
  data: {},
};

export default amqp1TypeLint;
