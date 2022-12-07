import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqtt5TypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_MQTT5_TYPE,
  source: 'apilint',
  message: '"mqtt5" must be a MQTT 5 Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqtt5OperationBinding'],
  marker: 'value',
  target: 'mqtt5',
  data: {},
};

export default mqtt5TypeLint;
