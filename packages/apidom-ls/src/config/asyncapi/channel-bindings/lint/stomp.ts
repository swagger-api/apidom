import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const stompLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_STOMP,
  source: 'apilint',
  message: '"stomp" must be a STOMP Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['stompChannelBinding'],
  marker: 'value',
  target: 'stomp',
  data: {},
};

export default stompLint;
