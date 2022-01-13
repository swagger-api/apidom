import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const redisLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_REDIS,
  source: 'apilint',
  message: '"redis" must be a Redis Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['redisMessageBinding'],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisLint;
