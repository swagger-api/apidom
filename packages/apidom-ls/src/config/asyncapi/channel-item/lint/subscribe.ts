import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelSubscribeLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_SUBSCRIBE,
  source: 'apilint',
  message: '"subscribe" must be an operation',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'subscribe',
  data: {},
};

export default channelSubscribeLint;
