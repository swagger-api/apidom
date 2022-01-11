import licenseUrlLint from './url';
import licenseNameLint from './name';
import licenseNameRequiredLint from './name-required';
import licenseAllowedFieldsLint from './allowed-fields';

const licenseLints = [
  licenseNameLint,
  licenseUrlLint,
  licenseNameRequiredLint,
  licenseAllowedFieldsLint,
];

export default licenseLints;
