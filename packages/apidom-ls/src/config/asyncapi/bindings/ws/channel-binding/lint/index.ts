import webSocketChannelBindingAllowedFieldsLint from './allowed-fields';
import webSocketChannelBindingMethodLint from './method';
import webSocketChannelBindingQueryLint from './query';
import webSocketChannelBindingHeadersLint from './headers';
import webSocketChannelBindingBindingVersionLint from './bindingVersion';

const lints = [
  webSocketChannelBindingAllowedFieldsLint,
  webSocketChannelBindingMethodLint,
  webSocketChannelBindingQueryLint,
  webSocketChannelBindingHeadersLint,
  webSocketChannelBindingBindingVersionLint,
];

export default lints;
