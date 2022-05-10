import serverUrlLint from './url';
import serverUrlRequiredLint from './url-required';
import serverProtocolLint from './protocol';
import serverProtocolRequiredLint from './protocol-required';
import serverProtocolVersionLint from './protocolversion';
import serverDescriptionLint from './description';
import serverVariablesLint from './variables';
import serverVariablesObjectLint from './variables-object';
import serverSecurityLint from './security';
import serverBindingsObjectLint from './bindings';
import serverAllowedFieldsLint from './allowed-fields';
import serverRefNonSiblingsLint from './ref-non-siblings';
import server$RefLint from './ref';

const lints = [
  serverUrlLint,
  serverUrlRequiredLint,
  serverProtocolLint,
  serverProtocolRequiredLint,
  serverProtocolVersionLint,
  serverDescriptionLint,
  serverVariablesLint,
  serverVariablesObjectLint,
  serverSecurityLint,
  serverBindingsObjectLint,
  serverAllowedFieldsLint,
  serverRefNonSiblingsLint,
  server$RefLint,
];

export default lints;
