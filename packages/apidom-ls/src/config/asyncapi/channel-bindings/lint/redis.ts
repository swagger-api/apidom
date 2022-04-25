import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const redisLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_REDIS,
  source: 'apilint',
  message: '"redis" must be a Redis Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['redisChannelBinding'],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisLint;
