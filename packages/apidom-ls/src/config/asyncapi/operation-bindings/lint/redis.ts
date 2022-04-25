import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const redisLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_REDIS,
  source: 'apilint',
  message: '"redis" must be a Redis Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['redisOperationBinding'],
  marker: 'value',
  target: 'redis',
  data: {},
};

export default redisLint;
