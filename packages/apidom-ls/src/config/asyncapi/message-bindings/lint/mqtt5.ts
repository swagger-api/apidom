import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqtt5Lint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_MQTT5,
  source: 'apilint',
  message: '"mqtt5" must be a MQTT 5 Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqtt5MessageBinding'],
  marker: 'value',
  target: 'mqtt5',
  data: {},
};

export default mqtt5Lint;
