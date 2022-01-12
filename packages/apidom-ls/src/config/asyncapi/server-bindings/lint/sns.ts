import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const snsLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_SNS,
  source: 'apilint',
  message: '"sns" must be a SNS Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['snsServerBinding'],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsLint;
