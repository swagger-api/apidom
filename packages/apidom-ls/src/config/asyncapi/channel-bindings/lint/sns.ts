import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const snsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_SNS,
  source: 'apilint',
  message: '"sns" must be a SNS Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['snsChannelBinding'],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsLint;
