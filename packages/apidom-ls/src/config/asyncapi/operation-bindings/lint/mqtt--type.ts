import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const mqttTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_MQTT_TYPE,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Operation Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['mqttOperationBinding']],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttTypeLint;
