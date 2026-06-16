import allowedFieldsLint from './allowed-fields.ts';
import organizationLint from './organization--type.ts';
import urlLint from './url--type.ts';

const lints = [allowedFieldsLint, organizationLint, urlLint];

export default lints;
