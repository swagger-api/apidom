import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqtt5Lint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_MQTT5,
  source: 'apilint',
  message: '"mqtt5" must be a MQTT 5 Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqtt5ChannelBinding'],
  marker: 'value',
  target: 'mqtt5',
  data: {},
};

export default mqtt5Lint;
