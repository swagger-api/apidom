import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqttTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_MQTT_TYPE,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqttOperationBinding'],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttTypeLint;
