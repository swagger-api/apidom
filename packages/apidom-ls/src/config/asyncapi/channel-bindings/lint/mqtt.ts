import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqttLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_MQTT,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqttChannelBinding'],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttLint;
