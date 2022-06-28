import httpMessageBindingAllowedFieldsLint from './allowed-fields';
import httpMessageBindingHeadersLint from './headers';
import httpMessageBindingBindingVersionLint from './bindingVersion';

const lints = [
  httpMessageBindingAllowedFieldsLint,
  httpMessageBindingHeadersLint,
  httpMessageBindingBindingVersionLint,
];

export default lints;
