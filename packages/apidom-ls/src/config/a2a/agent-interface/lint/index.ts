import allowedFieldsLint from './allowed-fields.ts';
import urlRequiredLint from './url--required.ts';
import protocolBindingRequiredLint from './protocol-binding--required.ts';
import protocolVersionRequiredLint from './protocol-version--required.ts';
import urlLint from './url--type.ts';
import protocolBindingLint from './protocol-binding--type.ts';
import protocolVersionLint from './protocol-version--type.ts';
import tenantLint from './tenant--type.ts';

const lints = [
  allowedFieldsLint,
  urlRequiredLint,
  protocolBindingRequiredLint,
  protocolVersionRequiredLint,
  urlLint,
  protocolBindingLint,
  protocolVersionLint,
  tenantLint,
];

export default lints;
