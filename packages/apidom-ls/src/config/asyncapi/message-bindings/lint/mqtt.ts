import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqttLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_MQTT,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqttMessageBinding'],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttLint;
