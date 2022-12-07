import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_AMQP_TYPE,
  source: 'apilint',
  message: '"amqp" must be a AMQP Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['amqpOperationBinding'],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpTypeLint;
