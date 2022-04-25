import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const anypointmqLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_ANYPOINTMQ,
  source: 'apilint',
  message: '"anypointmq" must be a Anypoint MQ Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['anypointmqChannelBinding'],
  marker: 'value',
  target: 'anypointmq',
  data: {},
};

export default anypointmqLint;
