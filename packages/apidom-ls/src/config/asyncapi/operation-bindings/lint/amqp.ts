import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqpLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_AMQP,
  source: 'apilint',
  message: '"amqp" must be a AMQP Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['amqpOperationBinding'],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpLint;
