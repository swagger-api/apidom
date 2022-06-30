import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const stompTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_STOMP_TYPE,
  source: 'apilint',
  message: '"stomp" must be a STOMP Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['stompChannelBinding'],
  marker: 'value',
  target: 'stomp',
  data: {},
};

export default stompTypeLint;
