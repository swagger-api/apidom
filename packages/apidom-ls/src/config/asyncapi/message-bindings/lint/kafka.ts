import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_KAFKA,
  source: 'apilint',
  message: '"kafka" must be a Kafka Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['kafkaMessageBinding'],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaLint;
