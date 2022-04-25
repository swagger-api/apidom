import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqttLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_MQTT,
  source: 'apilint',
  message: '"mqtt" must be a MQTT Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqttOperationBinding'],
  marker: 'value',
  target: 'mqtt',
  data: {},
};

export default mqttLint;
