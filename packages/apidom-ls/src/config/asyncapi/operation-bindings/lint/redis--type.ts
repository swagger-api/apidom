import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const redisTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_REDIS_TYPE,
  source: 'apilint',
  message: '"redis" must be a Redis Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['redisOperationBinding'],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisTypeLint;
