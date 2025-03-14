import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const amqp1TypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_AMQP1_TYPE,
  source: 'apilint',
  message: '"amqp1" must be a AMQP 1.0 Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['amqp1OperationBinding']],
  marker: 'value',
  target: 'amqp1',
  data: {},
};

export default amqp1TypeLint;
