import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const snsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_SNS_TYPE,
  source: 'apilint',
  message: '"sns" must be a SNS Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['snsChannelBinding'],
  marker: 'value',
  target: 'sns',
  data: {},
};

export default snsTypeLint;
