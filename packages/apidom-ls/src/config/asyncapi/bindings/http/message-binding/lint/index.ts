import httpMessageBindingAllowedFieldsLint from './allowed-fields';
import httpMessageBindingHeadersLint from './headers';
import httpMessageBindingsVersionLint from './bindingVersion';

const lints = [
  httpMessageBindingAllowedFieldsLint,
  httpMessageBindingHeadersLint,
  httpMessageBindingsVersionLint,
];

export default lints;
