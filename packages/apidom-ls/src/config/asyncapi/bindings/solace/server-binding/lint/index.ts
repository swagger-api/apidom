import solaceServerBindingAllowedFieldsLint from './allowed-fields';
import solaceServerBindingMsgVpnLint from './msg-vpn';
import solaceServerBindingBindingVersionLint from './bindingVersion';

const lints = [
  solaceServerBindingAllowedFieldsLint,
  solaceServerBindingMsgVpnLint,
  solaceServerBindingBindingVersionLint,
];

export default lints;
