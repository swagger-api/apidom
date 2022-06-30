import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_KAFKA_TYPE,
  source: 'apilint',
  message: '"kafka" must be a Kafka Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['kafkaChannelBinding'],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaTypeLint;
