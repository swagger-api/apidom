import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const amqpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_AMQP_TYPE,
  source: 'apilint',
  message: '"amqp" must be a AMQP Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['amqpServerBinding'],
  marker: 'value',
  target: 'amqp',
  data: {},
};

export default amqpTypeLint;
