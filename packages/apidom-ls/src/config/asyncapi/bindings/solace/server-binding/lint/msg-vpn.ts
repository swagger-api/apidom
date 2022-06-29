import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const solaceServerBindingMsgVpnLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_SOLACE_MSG_VPN,
  source: 'apilint',
  message: "'msgVpn' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'msgVpn',
  data: {},
};

export default solaceServerBindingMsgVpnLint;
