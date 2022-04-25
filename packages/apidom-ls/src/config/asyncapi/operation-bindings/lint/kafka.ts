import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_KAFKA,
  source: 'apilint',
  message: '"kafka" must be a Kafka Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['kafkaOperationBinding'],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaLint;
