import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqpLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_AMQP,
  source: 'apilint',
  message: '"amqp" must be a AMQP Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['amqpServerBinding'],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpLint;
