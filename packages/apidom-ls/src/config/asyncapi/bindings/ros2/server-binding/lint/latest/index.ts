import allowedFieldsLint from './allowed-fields.ts';
import rmwImplementationTypeLint from './rmw-implementation--type.ts';
import domainIdTypeLint from './domain-id--type.ts';
import domainIdMaximumLint from './domain-id--maximum.ts';

const lints = [rmwImplementationTypeLint, domainIdTypeLint, domainIdMaximumLint, allowedFieldsLint];

export default lints;
