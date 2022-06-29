import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const webSocketChannelBindingMethodLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_WEBSOCKET_METHOD,
  source: 'apilint',
  message: "'method' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'method',
  data: {},
};

export default webSocketChannelBindingMethodLint;
