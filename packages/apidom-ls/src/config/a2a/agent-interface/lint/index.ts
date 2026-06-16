import allowedFieldsLint from './allowed-fields.ts';
import urlLint from './url--type.ts';
import protocolBindingLint from './protocol-binding--type.ts';
import protocolVersionLint from './protocol-version--type.ts';
import tenantLint from './tenant--type.ts';

const lints = [allowedFieldsLint, urlLint, protocolBindingLint, protocolVersionLint, tenantLint];

export default lints;
