import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqttTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_MQTT_TYPE,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqttServerBinding'],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttTypeLint;
