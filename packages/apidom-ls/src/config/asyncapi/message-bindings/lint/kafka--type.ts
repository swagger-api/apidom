import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_KAFKA_TYPE,
  source: 'apilint',
  message: '"kafka" must be a Kafka Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['kafkaMessageBinding'],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaTypeLint;
