import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const redisLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_REDIS,
  source: 'apilint',
  message: '"redis" must be a Redis Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['redisServerBinding'],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisLint;
