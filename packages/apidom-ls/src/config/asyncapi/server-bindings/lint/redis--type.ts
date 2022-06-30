import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const redisTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_REDIS_TYPE,
  source: 'apilint',
  message: '"redis" must be a Redis Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['redisServerBinding'],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisTypeLint;
