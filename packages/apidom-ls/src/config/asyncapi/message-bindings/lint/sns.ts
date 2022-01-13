import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const snsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_SNS,
  source: 'apilint',
  message: '"sns" must be a SNS Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['snsMessageBinding'],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsLint;
