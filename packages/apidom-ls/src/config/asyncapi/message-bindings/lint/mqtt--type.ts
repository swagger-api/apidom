import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqttTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_MQTT_TYPE,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqttMessageBinding'],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttTypeLint;
