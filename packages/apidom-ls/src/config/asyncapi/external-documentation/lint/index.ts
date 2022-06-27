import externalDocsDescriptionLint from './description';
import externalDocsUrlRequiredLint from './url-required';
import externalDocsUrlLint from './url';
import externalDocsAllowedFieldsLint from './allowed-fields';

const lints = [
  externalDocsDescriptionLint,
  externalDocsUrlRequiredLint,
  externalDocsUrlLint,
  externalDocsAllowedFieldsLint,
];

export default lints;
