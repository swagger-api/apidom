import allowedFieldsLint from './allowed-fields.ts';
import organizationRequiredLint from './organization--required.ts';
import urlRequiredLint from './url--required.ts';
import organizationLint from './organization--type.ts';
import urlLint from './url--type.ts';

const lints = [
  allowedFieldsLint,
  organizationRequiredLint,
  urlRequiredLint,
  organizationLint,
  urlLint,
];

export default lints;
