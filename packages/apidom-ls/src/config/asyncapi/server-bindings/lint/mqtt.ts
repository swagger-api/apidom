import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqttLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_MQTT,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqttServerBinding'],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttLint;
