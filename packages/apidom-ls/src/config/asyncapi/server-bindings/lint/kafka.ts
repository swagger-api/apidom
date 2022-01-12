import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_KAFKA,
  source: 'apilint',
  message: '"kafka" must be a Kafka Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['kafkaServerBinding'],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaLint;
