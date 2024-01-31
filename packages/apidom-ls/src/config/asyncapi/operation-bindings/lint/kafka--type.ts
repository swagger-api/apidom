import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_KAFKA_TYPE,
  source: 'apilint',
  message: '"kafka" must be a Kafka Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['kafkaOperationBinding']],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaTypeLint;
