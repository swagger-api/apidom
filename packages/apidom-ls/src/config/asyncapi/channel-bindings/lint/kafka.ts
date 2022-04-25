import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_KAFKA,
  source: 'apilint',
  message: '"kafka" must be a Kafka Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['kafkaChannelBinding'],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaLint;
