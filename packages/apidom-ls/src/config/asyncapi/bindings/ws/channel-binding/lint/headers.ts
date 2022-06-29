import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const webSocketChannelBindingHeadersLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_WEBSOCKET_HEADERS,
  source: 'apilint',
  message: 'headers must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'headers',
  data: {},
};

export default webSocketChannelBindingHeadersLint;
