import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_WS_TYPE,
  source: 'apilint',
  message: '"ws" must be a WebSockets Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['wsChannelBinding'],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsTypeLint;
