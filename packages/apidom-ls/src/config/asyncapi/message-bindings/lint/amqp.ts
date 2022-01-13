import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqpLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_AMQP,
  source: 'apilint',
  message: '"amqp" must be a AMQP Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['amqpMessageBinding'],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpLint;
