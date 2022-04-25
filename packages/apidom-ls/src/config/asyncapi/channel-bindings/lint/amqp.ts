import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqpLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_AMQP,
  source: 'apilint',
  message: '"amqp" must be a AMQP Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['amqpChannelBinding'],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpLint;
