import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const redisTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_REDIS_TYPE,
  source: 'apilint',
  message: '"redis" must be a Redis Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['redisChannelBinding'],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisTypeLint;
