import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const kafkaTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_KAFKA_TYPE,
  source: 'apilint',
  message: '"kafka" must be a Kafka Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['kafkaServerBinding'],
  marker: 'value',
  target: 'kafka',
  data: {},
};

export default kafkaTypeLint;
