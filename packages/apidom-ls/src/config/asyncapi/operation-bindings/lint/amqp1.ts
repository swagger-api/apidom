import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqp1Lint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_AMQP1,
  source: 'apilint',
  message: '"amqp1" must be a AMQP 1.0 Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['amqp1OperationBinding'],
  marker: 'value',
  target: 'amqp1',
  data: {},
};

export default amqp1Lint;
